/**
 * AppWrite Service Module
 * Provides a unified interface for AppWrite operations with fallback support
 */

// Check if AppWrite SDK is available, otherwise load it
if (typeof Appwrite === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/appwrite@11.0.0/dist/appwrite.min.js';
    script.async = true;
    document.head.appendChild(script);
}

class AppWriteService {
    constructor() {
        this.client = null;
        this.db = null;
        this.initialized = false;
        this.isOnline = true;
        this.fallbackEnabled = AppWriteConfig.fallbackEnabled;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.submitContactForm = this.submitContactForm.bind(this);
        this.saveChatMessage = this.saveChatMessage.bind(this);
        this.getChatHistory = this.getChatHistory.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
        this.testConnection = this.testConnection.bind(this);
    }

    async init() {
        // Wait for Appwrite SDK to load if not present
        if (typeof Appwrite === 'undefined') {
            await new Promise((resolve, reject) => {
                const script = document.querySelector('script[src*="appwrite"]');
                if (script) {
                    script.onload = resolve;
                    script.onerror = reject;
                } else {
                    reject(new Error('AppWrite SDK not loaded'));
                }
            });
        }

        try {
            // Initialize client
            this.client = new Appwrite.Client();
            this.client
                .setEndpoint(AppWriteConfig.endpoint)
                .setProject(AppWriteConfig.projectId);

            // Initialize database
            this.db = new Appwrite.Database(this.client);
            
            // Test connection
            await this.testConnection();
            
            this.initialized = true;
            console.log('AppWrite service initialized successfully');
            return true;
        } catch (error) {
            console.warn('AppWrite initialization failed, falling back to localStorage:', error);
            this.initialized = false;
            this.isOnline = false;
            return false;
        }
    }

    async testConnection() {
        try {
            // Try to list collections as a connection test
            await this.db.listCollections();
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Submit contact form data
     * @param {Object} data - { name, email, message, subject (optional) }
     * @returns {Promise<Object>} - Created document with ID and timestamp
     */
    async submitContactForm(data) {
        const collectionId = AppWriteConfig.collections.contactSubmissions;
        
        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            throw new Error('Missing required fields: name, email, message');
        }

        const submissionData = {
            name: data.name.trim(),
            email: data.email.trim().toLowerCase(),
            message: data.message.trim(),
            subject: data.subject || 'Новый запрос с сайта',
            status: 'new',
            createdAt: new Date().toISOString(),
            ip: await this.getClientIP(),
            userAgent: navigator.userAgent.substring(0, 255)
        };

        try {
            if (this.initialized && this.isOnline) {
                const response = await this.db.createDocument(
                    collectionId,
                    Appwrite.ID.unique(),
                    submissionData
                );
                return { success: true, data: response, source: 'appwrite' };
            } else {
                throw new Error('AppWrite not available');
            }
        } catch (error) {
            console.warn('AppWrite submit failed, using fallback:', error);
            return this.fallbackSubmitContact(submissionData);
        }
    }

    /**
     * Fallback: Save contact form to localStorage
     */
    fallbackSubmitContact(data) {
        if (!this.fallbackEnabled) {
            throw new Error('AppWrite unavailable and fallback disabled');
        }

        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        const submission = {
            id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            ...data,
            createdAt: new Date().toISOString()
        };
        submissions.push(submission);
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
        
        return { success: true, data: submission, source: 'localstorage' };
    }

    /**
     * Save chat message
     * @param {Object} data - { text, sender ('user' or 'bot'), sessionId (optional) }
     * @returns {Promise<Object>} - Created document
     */
    async saveChatMessage(data) {
        const collectionId = AppWriteConfig.collections.chatMessages;
        
        const messageData = {
            text: data.text.trim(),
            sender: data.sender === 'bot' ? 'bot' : 'user',
            sessionId: data.sessionId || this.getSessionId(),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent.substring(0, 255)
        };

        try {
            if (this.initialized && this.isOnline) {
                const response = await this.db.createDocument(
                    collectionId,
                    Appwrite.ID.unique(),
                    messageData
                );
                return { success: true, data: response, source: 'appwrite' };
            } else {
                throw new Error('AppWrite not available');
            }
        } catch (error) {
            console.warn('AppWrite chat save failed, using fallback:', error);
            return this.fallbackSaveChat(messageData);
        }
    }

    /**
     * Fallback: Save chat message to localStorage
     */
    fallbackSaveChat(data) {
        if (!this.fallbackEnabled) {
            throw new Error('AppWrite unavailable and fallback disabled');
        }

        const history = JSON.parse(localStorage.getItem('kvantora_chat') || '[]');
        const message = {
            id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            ...data
        };
        history.push(message);
        localStorage.setItem('kvantora_chat', JSON.stringify(history));
        
        return { success: true, data: message, source: 'localstorage' };
    }

    /**
     * Get chat history for current session
     * @param {string} sessionId - Optional session ID
     * @returns {Promise<Array>} - Array of chat messages
     */
    async getChatHistory(sessionId = null) {
        const session = sessionId || this.getSessionId();
        const collectionId = AppWriteConfig.collections.chatMessages;
        
        try {
            if (this.initialized && this.isOnline) {
                const response = await this.db.listDocuments(
                    collectionId,
                    [Appwrite.Query.equal('sessionId', session)],
                    100 // limit
                );
                // Sort by timestamp
                const sorted = response.documents.sort((a, b) => 
                    new Date(a.timestamp) - new Date(b.timestamp)
                );
                return { success: true, data: sorted, source: 'appwrite' };
            } else {
                throw new Error('AppWrite not available');
            }
        } catch (error) {
            console.warn('AppWrite get chat history failed, using fallback:', error);
            return this.fallbackGetChat(session);
        }
    }

    /**
     * Fallback: Get chat history from localStorage
     */
    fallbackGetChat(sessionId) {
        if (!this.fallbackEnabled) {
            return { success: true, data: [], source: 'localstorage' };
        }

        const history = JSON.parse(localStorage.getItem('kvantora_chat') || '[]');
        // In localStorage fallback, we don't filter by session - return all
        return { success: true, data: history, source: 'localstorage' };
    }

    /**
     * Get portfolio items from AppWrite or fallback to JSON
     * @returns {Promise<Array>} - Array of portfolio items
     */
    async getPortfolioItems() {
        const collectionId = AppWriteConfig.collections.portfolio;
        
        try {
            if (AppWriteConfig.features.useAppWriteForPortfolio && 
                this.initialized && this.isOnline) {
                const response = await this.db.listDocuments(collectionId, [], 50);
                return { success: true, data: response.documents, source: 'appwrite' };
            } else {
                throw new Error('AppWrite portfolio disabled');
            }
        } catch (error) {
            console.warn('AppWrite portfolio fetch failed, using JSON fallback:', error);
            return this.fallbackGetPortfolio();
        }
    }

    /**
     * Fallback: Load portfolio from JSON file
     */
    async fallbackGetPortfolio() {
        try {
            const response = await fetch('portfolio.json');
            if (!response.ok) throw new Error('Failed to load portfolio.json');
            const data = await response.json();
            return { success: true, data: data, source: 'json' };
        } catch (error) {
            console.error('Portfolio JSON fallback failed:', error);
            return { success: false, data: [], source: 'none', error: error.message };
        }
    }

    /**
     * Get client IP address (for logging)
     */
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return null;
        }
    }

    /**
     * Generate or retrieve session ID
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('chat_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('chat_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Clear chat history (admin function or user clear)
     */
    async clearChatHistory(sessionId = null) {
        const session = sessionId || this.getSessionId();
        const collectionId = AppWriteConfig.collections.chatMessages;
        
        try {
            if (this.initialized && this.isOnline) {
                // Get all messages for session
                const response = await this.db.listDocuments(
                    collectionId,
                    [Appwrite.Query.equal('sessionId', session)]
                );
                
                // Delete each message
                const deletePromises = response.documents.map(doc => 
                    this.db.deleteDocument(collectionId, doc.$id)
                );
                await Promise.all(deletePromises);
                return { success: true, count: deletePromises.length };
            }
        } catch (error) {
            console.warn('AppWrite clear chat failed:', error);
        }
        
        // Fallback: clear localStorage
        localStorage.removeItem('kvantora_chat');
        return { success: true, source: 'localstorage' };
    }
}

// Create singleton instance
const appwriteService = new AppWriteService();

// Auto-initialize when DOM is ready (optional, can be called manually)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Delay initialization to allow config to load
        setTimeout(() => appwriteService.init(), 100);
    });
} else {
    setTimeout(() => appwriteService.init(), 100);
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { appwriteService, AppWriteService };
} else {
    window.appwriteService = appwriteService;
    window.AppWriteService = AppWriteService;
}

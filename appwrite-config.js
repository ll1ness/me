/**
 * AppWrite Configuration
 * 
 * IMPORTANT: For production, set these values via environment variables
 * or a server-side configuration to avoid exposing credentials.
 * 
 * Setup instructions:
 * 1. Create an AppWrite project at https://cloud.appwrite.io
 * 2. Create the following collections with appropriate permissions
 * 3. Update the configuration values below
 */

const AppWriteConfig = {
    // AppWrite endpoint (cloud or self-hosted)
    endpoint: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    
    // AppWrite project ID
    projectId: process.env.APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID',
    
    // Collection IDs (create these in AppWrite console)
    collections: {
        // For contact form submissions
        contactSubmissions: process.env.APPWRITE_CONTACT_COLLECTION_ID || 'YOUR_CONTACT_COLLECTION_ID',
        
        // For chat messages
        chatMessages: process.env.APPWRITE_CHAT_COLLECTION_ID || 'YOUR_CHAT_COLLECTION_ID',
        
        // For portfolio items (optional - can still use JSON)
        portfolio: process.env.APPWRITE_PORTFOLIO_COLLECTION_ID || 'YOUR_PORTFOLIO_COLLECTION_ID'
    },
    
    // Database ID (usually same as project ID for default database)
    databaseId: process.env.APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID',
    
    // Feature flags
    features: {
        useAppWriteForContact: true,
        useAppWriteForChat: true,
        useAppWriteForPortfolio: false, // Set to true to migrate from JSON
        enableRealTimeChat: false // Set to true to use AppWrite real-time subscriptions
    },
    
    // Fallback to localStorage/JSON if AppWrite fails
    fallbackEnabled: true
};

// Export for both ES modules and browser global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppWriteConfig;
} else {
    window.AppWriteConfig = AppWriteConfig;
}

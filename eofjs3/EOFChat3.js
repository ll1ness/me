// ===== Chat with AppWrite Integration =====
const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Load chat history from AppWrite or localStorage fallback
async function loadChatHistory() {
    chatMessages.innerHTML = '';
    
    // Default welcome message
    const welcomeMsg = {
        text: "Привет! 👋\nЯ виртуальный ассистент КВАНТОРА.\nКак я могу вам помочь?",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    let history = [];
    
    // Try AppWrite first
    if (window.appwriteService && window.appwriteService.initialized) {
        try {
            const result = await window.appwriteService.getChatHistory();
            if (result.success && result.data && result.data.length > 0) {
                history = result.data.map(msg => ({
                    text: msg.text,
                    sender: msg.sender,
                    time: new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                }));
            }
        } catch (error) {
            console.warn('Failed to load chat from AppWrite, using fallback:', error);
        }
    }
    
    // Fallback to localStorage if no history from AppWrite
    if (history.length === 0) {
        const localHistory = JSON.parse(localStorage.getItem('kvantora_chat') || '[]');
        if (localHistory.length > 0) {
            history = localHistory;
        }
    }
    
    const messagesToShow = history.length > 0 ? history : [welcomeMsg];
    
    messagesToShow.forEach(msg => {
        addMessageToChat(msg.text, msg.sender, msg.time, false);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add message to chat UI
function addMessageToChat(text, sender, time, save = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `
        ${text.replace(/\n/g, '<br>')}
        <div class="chat-message-time">${time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (save) {
        // Save to AppWrite if available, otherwise localStorage
        if (window.appwriteService && window.appwriteService.initialized) {
            window.appwriteService.saveChatMessage({
                text,
                sender,
                sessionId: window.appwriteService.getSessionId()
            }).catch(error => {
                console.warn('Failed to save chat to AppWrite:', error);
            });
        } else {
            const history = JSON.parse(localStorage.getItem('kvantora_chat') || '[]');
            history.push({ text, sender, time });
            localStorage.setItem('kvantora_chat', JSON.stringify(history));
        }
    }
}

// Send message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    addMessageToChat(message, 'user', time);
    chatInput.value = '';

    // If using AppWrite, ensure message is saved with session
    if (window.appwriteService && window.appwriteService.initialized) {
        try {
            await window.appwriteService.saveChatMessage({
                text: message,
                sender: 'user',
                sessionId: window.appwriteService.getSessionId()
            });
        } catch (error) {
            console.warn('Failed to save user message to AppWrite:', error);
        }
    }

    // Simulate bot response (could be replaced with AppWrite Functions/AI)
    setTimeout(() => {
        const responses = [
            "Спасибо за сообщение! Наш специалист ответит вам в ближайшее время.",
            "Отличный вопрос! Давайте обсудим детали в чате.",
            "Мы готовы помочь! Опишите ваш проект подробнее.",
            "Интересно! Можете рассказать больше о ваших целях?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const botTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        addMessageToChat(randomResponse, 'bot', botTime);
    }, 1000);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Chat trigger
document.querySelectorAll('.chat-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        chatContainer.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => chatInput.focus(), 500);
    });
});

// Initialize chat
loadChatHistory();

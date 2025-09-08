document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user-message');
        userInput.value = '';

        // Simulate API call and bot response
        fetchBotResponse(message);
    }

    function appendMessage(text, className) {
        const li = document.createElement('li');
        li.textContent = text;
        li.classList.add(className);
        chatMessages.appendChild(li);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    async function fetchBotResponse(userMessage) {
        // Replace with your actual API endpoint and key
        const apiUrl = 'YOUR_CHATBOT_API_ENDPOINT'; 
        const apiKey = 'YOUR_API_KEY'; // If required by your API

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization headers if your API requires them
                    // 'Authorization': `Bearer ${apiKey}` 
                },
                body: JSON.stringify({ message: userMessage }) // Adjust payload based on your API
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Adjust to extract the bot's response from the API's response structure
            const botResponse = data.reply || "Sorry, I couldn't get a response."; 
            appendMessage(botResponse, 'bot-message');

        } catch (error) {
            console.error('Error fetching bot response:', error);
            appendMessage("Error: Could not connect to the chatbot.", 'bot-message');
        }
    }
});

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageText = messageInput.value.trim();

    if (messageText === "") return;

    const messagesContainer = document.getElementById("messages");

    // Add user's message
    const userMessageBubble = document.createElement("div");
    userMessageBubble.classList.add("message", "sent");
    userMessageBubble.textContent = messageText;
    messagesContainer.appendChild(userMessageBubble);

    messageInput.value = ""; // Clear input field
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add temporary "Thinking..." loading message
    const loadingBubble = document.createElement("div");
    loadingBubble.classList.add("message", "received", "loading");
    loadingBubble.textContent = "Thinking.....";
    messagesContainer.appendChild(loadingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Fetch AI response
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
    })
        .then(response => response.json())
        .then(data => {
            // Replace loading message with actual response
            loadingBubble.classList.remove("loading");
            loadingBubble.innerHTML = "";  // Clear "Thinking..."

            const preTag = document.createElement("pre");
            preTag.textContent = data.response;
            preTag.style.fontSize = "15px";  // Or apply your class

            loadingBubble.appendChild(preTag);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
        .catch(error => {
            loadingBubble.textContent = "Error generating response.";
            console.error("Error:", error);
        });
}
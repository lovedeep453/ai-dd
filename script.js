document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const refreshBtn = document.getElementById("refreshBtn");
    const refreshNotice = document.getElementById("refreshNotice");
    let lastMessageTime = null;
    function createMessage(text, sender, time) {
        const msg = document.createElement("div");
        msg.classList.add("message", sender);
        const timestamp = new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        msg.innerHTML = `
            <div class="bubble ${sender}">${text}</div>
            <div class="timestamp">${timestamp}</div>
        `;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    async function fetchMessages() {
    refreshNotice.style.display = "inline-block";
    chatWindow.classList.add("loading");
    try {
        const res = await fetch("https://ai-dd.onrender.com/all-messages");
        const data = await res.json();
        if (data.messages) {
            // Only append new messages
            data.messages.forEach((msg) => {
                const msgTime = new Date(msg.datetime).getTime();
                if (!lastMessageTime || msgTime > lastMessageTime) {
                    createMessage(msg.message, msg.user_type, msg.datetime);
                    lastMessageTime = msgTime;
                }
            });
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    } catch (err) {
        console.error("Fetch failed", err);
    } finally {
        setTimeout(() => {
            refreshNotice.style.display = "none";
            chatWindow.classList.remove("loading");
        }, 1000);
    }
}


    async function fetchMessages() {
    refreshNotice.style.display = "inline-block";
    chatWindow.classList.add("loading");
    try {
        const res = await fetch("https://ai-dd.onrender.com/all-messages");
        const data = await res.json();
        if (data.messages) {
            // Only append new messages
            data.messages.forEach((msg) => {
                const msgTime = new Date(msg.datetime).getTime();
                if (!lastMessageTime || msgTime > lastMessageTime) {
                    createMessage(msg.message, msg.user_type, msg.datetime);
                    lastMessageTime = msgTime;
                }
            });
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    } catch (err) {
        console.error("Fetch failed", err);
    } finally {
        setTimeout(() => {
            refreshNotice.style.display = "none";
            chatWindow.classList.remove("loading");
        }, 1000);
    }
}



    refreshBtn.addEventListener("click", fetchMessages);
    fetchMessages();
});

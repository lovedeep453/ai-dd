document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const refreshBtn = document.getElementById("refreshBtn");
    const refreshNotice = document.getElementById("refreshNotice");

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
                chatWindow.innerHTML = "";
                data.messages.forEach((msg) =>
                    createMessage(msg.message, msg.user_type, msg.datetime)
                );
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

    chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    chatInput.value = "";
    createMessage(userMsg, "user", new Date().toISOString()); // 👈 Instant feedback

    await fetch("https://ai-dd.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
    });

    // ⏳ Optional: show "thinking..." or "Agent 1 is replying..." while waiting
    createMessage("...", "bot", new Date().toISOString());

    // After delay, refresh messages
    setTimeout(() => {
        refreshBtn.click();
    }, 1000); // or increase to 1500–2000ms depending on n8n speed
});


    refreshBtn.addEventListener("click", fetchMessages);
    fetchMessages();
});

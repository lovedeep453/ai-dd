const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");


function createMessage(text, sender = "bot") {
 const msg = document.createElement("div");
 msg.classList.add("message", sender);


 const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


 msg.innerHTML = `
   <div class="bubble ${sender}">${text}</div>
   <div class="timestamp">${timestamp}</div>
 `;
 chatWindow.appendChild(msg);
 chatWindow.scrollTop = chatWindow.scrollHeight;
}


chatForm.addEventListener("submit", function (e) {
 e.preventDefault();
 const userMsg = chatInput.value.trim();
 if (!userMsg) return;


 createMessage(userMsg, "user");


 // Simulate bot response (replace this later with API call)
 setTimeout(() => {
   const reply = `You liked "${userMsg}"? Try watching "Interstellar" next! 🎬`;
   createMessage(reply, "bot");
 }, 1000);


 chatInput.value = "";
});




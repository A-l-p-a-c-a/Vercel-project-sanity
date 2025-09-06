// front.js

async function sendMessage() {
  const input = document.getElementById('input').value;
  document.getElementById('chatlog').innerText += `You: ${input}\n`;
  document.getElementById('input').value = "";
  
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data = await response.json();

  if (data.reply) {
    document.getElementById('chatlog').innerText += `Bot: ${data.reply}\n`;
  } else if (data.error) {
    document.getElementById('chatlog').innerText += `Error: ${data.error}\n`;
  }
}

// front.js

async function sendMessage() {
  const input = document.getElementById('input').value;
  const response = await fetch('/api/index', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data = await response.json();

  // Display the AI's reply somewhere, e.g., in a div with id="chatlog"
  if (data.reply) {
    document.getElementById('chatlog').innerText += `Bot: ${data.reply}\n`;
  } else if (data.error) {
    document.getElementById('chatlog').innerText += `Error: ${data.error}\n`;
  }
}

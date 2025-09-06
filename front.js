// This is run in the browser!
async function sendMessage() {
  const input = document.getElementById('input').value;
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ message: input })
  });
  const data = await response.json();
  // Now do something with data.reply

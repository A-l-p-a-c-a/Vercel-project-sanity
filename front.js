// front.js
  async function sendMessage() {
  const input = document.getElementById('input').value;
  const response = await fetch('https://https://vercel-project-sanity.vercel.app/api/data') // Replace with your Vercel backend URL
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
  });
  const data = await response.json();

  // Display the AI's reply somewhere, e.g., in a div with id="chatlog"
  if (data.reply) {
    document.getElementById('chatlog').innerText += `Bot: ${data.reply}\n`;
  } else if (data.error) {
    document.getElementById('chatlog').innerText += `Error: ${data.error}\n`;
  }
}

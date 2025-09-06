async function sendAlpacaMessage(messages) {
  // Use your Vercel deployment URL here!
  const apiUrl = "http://vercel-project-sanity.vercel.app/api/index.js"; // <-- CHANGE THIS

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();

  // If there's an error, handle it
  if (data.error) {
    console.error("API error:", data.error);
    return "Error: " + data.error;
  }

  return data.reply;
}

// Example usage: Send a message and log the reply
sendAlpacaMessage([{ role: "user", content: "Hello Alpaca!" }])
  .then(reply => {
    console.log("Alpaca says:", reply);
    // You could display this in your HTML page too!
  });

// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Only accept POST requests
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key not configured." });
  }

  // Parse message from request body
  let userMessage;
  try {
    // If you're using Next.js, you might need: const { message } = req.body;
    userMessage = req.body.message;
  } catch (err) {
    return res.status(400).json({ error: "Invalid request body." });
  }

  try {
    // Call OpenAI Chat API
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14", // or "gpt-4" if you have access, or your preferred model!
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 256, // Optional, adjust as needed
      }),
    });

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      return res.status(500).json({ error: "OpenAI API error: " + errorText });
    }

    const openaiData = await openaiRes.json();
    const reply = openaiData.choices?.[0]?.message?.content || "No response from AI.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

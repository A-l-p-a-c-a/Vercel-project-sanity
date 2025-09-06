export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Set this in Vercel env vars
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14", // or "gpt-4.1" if supported
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Internal error", details: error.message });
  }
}

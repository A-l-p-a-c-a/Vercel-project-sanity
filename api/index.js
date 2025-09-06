// api/index.js
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("Incoming body:", req.body);

  const { messages } = req.body || {};
  if (!messages) {
    return res.status(400).json({ error: "No messages provided" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages,
        max_completion_tokens: 800,   // ✅ bumped up from 200
      }),
    });

    const data = await response.json();
    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

    // ✅ safe reply handling
    const reply = data.choices?.[0]?.message?.content?.trim() || "(empty reply)";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Error calling OpenAI:", err);
    return res.status(500).json({ error: err.message });
  }
};

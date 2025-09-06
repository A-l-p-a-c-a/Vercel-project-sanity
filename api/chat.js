export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({reply: "Server error: No API key set."});
  }

  let message = "";
  try {
    message = req.body.message || "";
  } catch (e) {
    return res.status(400).json({reply: "Invalid request"});
  }

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}],
    }),
  });

  if (!openaiRes.ok) {
    return res.status(500).json({reply: "OpenAI call failed"});
  }
  const openaiData = await openaiRes.json();
  res.status(200).json({ reply: openaiData.choices[0].message.content });
};

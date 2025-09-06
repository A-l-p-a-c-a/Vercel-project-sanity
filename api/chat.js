// /api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey)
    return res.status(500).json({ error: "OpenAI API key not configured." });

  const userMessage = req.body.message;
  if (!userMessage)
    return res.status(400).json({ error: "No message provided." });

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-4" if you have access!
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 256,
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
    const openaiData = await openaiRes.json();
    const reply =
      openaiData.choices?.[0]?.message?.content ||
      "No response from AI.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
}

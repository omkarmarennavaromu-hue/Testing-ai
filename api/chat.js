export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    const API_KEY = process.env.OPENROUTER_API_KEY;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a strict Indian exam AI. Give short, direct, no-nonsense answers."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        res.status(200).json({
            reply: data.choices?.[0]?.message?.content || "No response"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

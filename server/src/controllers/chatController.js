const maxMessages = 20;

export const createChatResponse = async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > maxMessages) {
    return res.status(400).json({ error: `Send between 1 and ${maxMessages} chat messages.` });
  }
  if (messages.some((message) => (
    !message
    || !['user', 'assistant'].includes(message.role)
    || typeof message.content !== 'string'
    || !message.content.trim()
    || message.content.length > 2000
  ))) {
    return res.status(400).json({ error: 'Chat messages must include valid roles and content.' });
  }
  if (!process.env.AI_API_URL || !process.env.AI_API_KEY || !process.env.AI_MODEL) {
    return res.status(503).json({ error: 'AI chat is not configured. Set AI_API_URL, AI_API_KEY, and AI_MODEL.' });
  }
  try {
    const response = await fetch(process.env.AI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        messages,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('AI provider request failed:', response.status);
      return res.status(502).json({ error: 'The AI service could not process your message.' });
    }
    const message = result.choices?.[0]?.message?.content;
    if (typeof message !== 'string' || !message.trim()) {
      console.error('AI provider returned no message.');
      return res.status(502).json({ error: 'The AI service returned an empty response.' });
    }
    return res.json({ message: message.trim() });
  } catch (error) {
    console.error('AI chat request failed:', error.name || 'AIProviderError');
    return res.status(502).json({ error: 'The AI service is temporarily unavailable.' });
  }
};

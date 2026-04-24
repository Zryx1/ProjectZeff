// Vercel Serverless Function - /api/command.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  const { panel_url, command, params } = req.body;
  
  if (!panel_url) {
    return res.json({ error: "panel_url required" });
  }
  
  try {
    const response = await fetch(`${panel_url}/api/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, params })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
}
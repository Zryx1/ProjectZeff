// Vercel Serverless Function - /api/register.js
let panels = {};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  if (req.method === "POST") {
    const { panel_id, local_ip, public_ip, port, token_status, uptime, last_data } = req.body;
    
    if (!panels[panel_id]) {
      panels[panel_id] = {};
    }
    
    panels[panel_id] = {
      ...panels[panel_id],
      local_ip,
      public_ip,
      port,
      token_status,
      uptime,
      last_data,
      last_seen: new Date().toISOString()
    };
    
    return res.json({ status: "ok", message: "Panel registered" });
  }
  
  if (req.method === "GET") {
    return res.json({ panels });
  }
  
  res.status(405).json({ error: "Method not allowed" });
}
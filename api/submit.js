// Vercel Serverless Function - /api/submit.js
let allData = {};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  if (req.method === "POST") {
    const { panel_id, data, timestamp } = req.body;
    
    if (!allData[panel_id]) {
      allData[panel_id] = {};
    }
    
    allData[panel_id] = {
      clan_data: data,
      last_update: timestamp
    };
    
    return res.json({ status: "ok", message: "Data received" });
  }
  
  if (req.method === "GET") {
    const panel_id = req.query.panel_id;
    if (panel_id && allData[panel_id]) {
      return res.json(allData[panel_id]);
    }
    return res.json(allData);
  }
  
  res.status(405).json({ error: "Method not allowed" });
}
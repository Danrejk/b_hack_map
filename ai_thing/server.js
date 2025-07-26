import 'dotenv/config';
import path from 'node:path';
import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY });

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/climate-risk', async (req, res) => {
  try {
    const { lat, lng, locationName } = req.body || {};
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ ok: false, error: 'lat and lng are required numbers' });
    }

    // Mock mode to keep developing if you hit limits
    if (process.env.MOCK === '1') {
      const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      return res.json({
        ok: true,
        html: `<h3>Climate risk snapshot (mock)</h3>
               <ul><li>Coords: ${coords}${locationName ? ' (' + locationName + ')' : ''}</li>
               <li>Heat: elevated summers</li><li>Flooding: check local maps</li></ul>
               <p style="font-size:0.9em;opacity:0.8;">Not a substitute for official assessments.</p>`
      });
    }

    const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    const place = locationName ? ` (${locationName})` : '';

    const instructions =
      "You are a climate risk analyst. Write concise, non-alarmist risk scans suitable for a small map popup.";
    const input = [
      `Evaluate key climate-related risks for the area around ${coords}${place}.`,
      // "Use high-level, general knowledge only (no exact probabilities or guarantees).",
      "Touch on: heat stress, flooding (river/coastal), wildfire, drought, storms; mention time horizons (2030s, 2050s).",
      "Return ONLY a raw HTML fragment (no Markdown, no code fences, no backticks).:",
      "<h4>Climate risk snapshot</h4>",
      "<ul><li>…</li></ul>",
    ].join('\n');

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: instructions + '\n' + input,
      config: { thinkingConfig: { thinkingBudget: 0 } } // optional: faster/cheaper
    });

    return res.json({ ok: true, html: result.text ?? 'No response' });
  } catch (err) {
    console.error('Gemini error:', {
      status: err?.status,
      message: err?.message,
      data: err?.response?.data
    });
    return res.status(err?.status || 500).json({
      ok: false,
      error: err?.message || 'Gemini request failed',
      details: err?.response?.data || null
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

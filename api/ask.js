export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "No question provided" });

  const GEMINI_KEY = process.env.GEMINI_KEY; // ponela en variables de entorno en Vercel

  const productos = [
    { nombre: "Harina integral", descripcion: "Harina 100% integral..." },
    { nombre: "Semillas de chía", descripcion: "Fuente de omega 3..." },
    { nombre: "Mix de frutos secos", descripcion: "Mezcla de nueces..." },
    { nombre: "Té verde", descripcion: "Bebida antioxidante..." },
    { nombre: "Jugos naturales", descripcion: "Bebidas sin azúcar..." }
  ];

  const prompt = `
  Eres un asistente de una dietética llamada "Vida Natural". 
  Solo debes responder sobre productos que existen en el siguiente catálogo:

  ${productos.map(p => `- ${p.nombre}: ${p.descripcion}`).join("\n")}

  Pregunta: ${question}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.status(200).json({ answer: reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

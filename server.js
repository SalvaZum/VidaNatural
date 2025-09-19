// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// const GEMINI_KEY = "AIzaSyDFkI7FGeLLsQAnRvYGBqrkanVFgyKb_cw";

// // Array de productos de la dietética
// export default function handler(req, res) {
//   const productos = [
//   { nombre: "Harina integral", descripcion: "Harina 100% integral, ideal para panes y repostería saludable.", imagen: "https://resizer.glanacion.com/resizer/v2/la-harina-integral-ofrece-multiples-beneficios-a-XW65KHDDCNHV5KONZVAHCNH32Q.jpg?auth=e29c1982deb1d98f9e961aeb16d383e5399673ec69cbd759bed5bf3588925686&width=1280&height=854&quality=70&smart=true" },
//   { nombre: "Semillas de chía", descripcion: "Fuente de omega 3, fibra y antioxidantes.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSes32hmUKxqBDSvFrRsupW5mkN57QMlfCg0A&s"},
//   { nombre: "Mix de frutos secos", descripcion: "Mezcla de nueces, almendras y pasas, ideal para energía natural.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMT6hi8938W6pqwNb4P-r3xTo01slUbAyVg&s" },
//   { nombre: "Té verde", descripcion: "Bebida antioxidante, ideal para detox y bienestar.", imagen: "https://image.tuasaude.com/media/article/yp/dt/beneficios-del-te-verde_17350.jpg?width=686&height=487" },
//   { nombre: "Jugos naturales", descripcion: "Bebidas sin azúcar añadida, elaboradas con frutas frescas.", imagen: "https://lirp.cdn-website.com/586fb047/dms3rep/multi/opt/jugos+naturales-640w.jpg" }
// ];
//   res.status(200).json(productos);
// }

// // Endpoint para que el front acceda a los productos
// app.get("/api/products", (req, res) => {
//   res.json(productos);
// });

// app.post("/api/ask", async (req, res) => {
//   const { question } = req.body;
//   if (!question) return res.status(400).json({ error: "No question provided" });

//   // Creamos el prompt con contexto de productos
//   const prompt = `
//   Eres un asistente de una dietética llamada "Vida Natural". 
//   Solo debes responder sobre productos que existen en el siguiente catálogo:

//   ${productos.map(p => `- ${p.nombre}: ${p.descripcion}`).join("\n")}

//   Responde a la siguiente pregunta del cliente de forma clara, breve y amable:
//   Pregunta: ${question}
//   `;



//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: prompt }] }]
//         })
//       }
//     );

//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(`Gemini API error: ${text}`);
//     }

//     const data = await response.json();
//     const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     res.json({ answer: reply });

//   } catch (err) {
//     console.error("Error al llamar a Gemini:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

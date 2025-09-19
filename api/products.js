export default function handler(req, res) {
  const productos = [
    { nombre: "Harina integral", descripcion: "Harina 100% integral...", imagen: "..." },
    { nombre: "Semillas de chía", descripcion: "Fuente de omega 3...", imagen: "..." },
    { nombre: "Mix de frutos secos", descripcion: "Mezcla de nueces...", imagen: "..." },
    { nombre: "Té verde", descripcion: "Bebida antioxidante...", imagen: "..." },
    { nombre: "Jugos naturales", descripcion: "Bebidas sin azúcar...", imagen: "..." }
  ];
  res.status(200).json(productos);
}

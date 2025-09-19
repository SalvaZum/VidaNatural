export default function handler(req, res) {
  const productos = [
    { nombre: "Harina integral", descripcion: "Harina 100% integral", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlIjW3TbtSqaqeW_dDZQUpSmiDE5MHR10nXQ&s" },
    { nombre: "Semillas de chía", descripcion: "Fuente de omega 3", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSes32hmUKxqBDSvFrRsupW5mkN57QMlfCg0A&s" },
    { nombre: "Mix de frutos secos", descripcion: "Mezcla de nueces", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLGb00q6Z7VP-oHYlETopVp_lVmfZ-HGphpw&s" },
    { nombre: "Té verde", descripcion: "Bebida antioxidante", imagen: "https://image.tuasaude.com/media/article/yp/dt/beneficios-del-te-verde_17350.jpg" },
    { nombre: "Jugos naturales", descripcion: "Bebidas sin azúcar", imagen: "https://lirp.cdn-website.com/586fb047/dms3rep/multi/opt/jugos+naturales-640w.jpg" }
  ];
  res.status(200).json(productos);
}

// para rutas
const { Router } = require("express");
const route = Router();

// constructores
const { GeneratorCart, GeneratorProd } = require("../utils/ConstructorProd");

// administracion
const { isAdmin, permiso } = require("../utils/Admin&URL");

// Objeto
const Cart = new GeneratorCart("CartFinal.txt");
const produto = new GeneratorProd("ProductosFinal.txt");

// ---- Rutas para cart ----

// POST: '/' - Crea un carrito y devuelve su id.
route.post("/", isAdmin(permiso), async (req, res) => {
	const productos = await produto.getAll();
	const obj = { timestamp: new Date(), productos };
	res.json(await Cart.save(obj));
});

// DELETE: '/:id' - Vacía un carrito y lo elimina.
route.delete("/:id", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	res.json(await Cart.deleteById(id));
});

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
route.get("/:id/productos", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	res.json(await Cart.getById(id));
});

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
route.post("/:id/productos", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	res.json(await Cart.updateCart(id, { tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() }));
});

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
route.delete("/:id/productos/:id_prod", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	res.json(await Cart.deleteProdfromCart(id, id_prod));
});

// Atajo URLs no validas
route.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

module.exports = route;

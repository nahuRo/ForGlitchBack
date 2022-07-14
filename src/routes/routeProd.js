// para rutas
const { Router } = require("express");
const route = Router();

// constructores
const { GeneratorProd } = require("../utils/ConstructorProd");

// Objeto
const produto = new GeneratorProd("ProductosFinal.txt");

// administracion
const { isAdmin, permiso } = require("../utils/Admin&URL");

// ---- Rutas para productos ----

// Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
route.get("/:id", async (req, res) => {
	const id = Number(req.params.id);
	const long = await produto.getAll(); // "entre"  por el return
	long.length >= id ? res.json(await produto.getById(id)) : res.json(await produto.getAll()); // los 2 devuelven objetos
});

// Para incorporar productos al listado (disponible para administradores)
route.post("/", isAdmin(permiso), async (req, res) => {
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	let id = (await produto.getAll()).length + 1 || 0;
	await produto.save({ tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date(), id });
	res.redirect("/");
});

// Actualiza un producto por su id (disponible para administradores)
route.put("/:id", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	const { tittle, price, thumbnail, descripcion, stock } = req.body;
	const codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);
	res.json(produto.update(id, { tittle, price, thumbnail, descripcion, stock, codeBar, timestamp: new Date() })); // nuevo metodo
});

// Borra un producto por su id (disponible para administradores)
route.delete("/:id", isAdmin(permiso), async (req, res) => {
	const id = Number(req.params.id);
	res.json(await produto.deleteById(id));
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

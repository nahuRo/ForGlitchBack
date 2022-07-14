// para rutas
const { Router } = require("express");
const route = Router();

// traigo las rutas a donde quiero ir
const routeProd = require("./routeProd");
const routeCard = require("./routeCart");

// funcionan todos los metodos , la unica condicion es que halla un txt creado para que empiece ejecutar todo joia
route.use("/productos", routeProd);
route.use("/carrito", routeCard);

// Atajo URLs no validas
route.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

module.exports = route;

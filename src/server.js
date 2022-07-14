const express = require("express");
const app = express();
const path = require("path");

const rutas = require("./routes/routeIndex");

// Middleware
app.use(express.json()); //midu usa solo este middleware
app.use(express.urlencoded({ extended: true }));

app.listen(8080, (err) => {
	err ? console.log(err) : console.log("sevidor iniciado en http://localhost:8080/");
});

app.use(express.static(path.join(__dirname, "../public")));

app.use("/Api", rutas);

// Atajo URLs no validas
app.use((req, res) => {
	res.status(404).json({
		error: -1,
		descripcion: req.path,
		método: "no autorizada",
	});
});

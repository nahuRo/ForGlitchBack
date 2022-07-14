// para la autorizacion
const isAdmin = (admin) => {
	return (req, res, next) => (admin ? next() : res.status(401).send("No sos Admin pa"));
};

// dar permiso
const permiso = false; // <---- cambia el boolean

// para una URL invalida
// const notURL = (req, res) => {
// 	res.status(404).json({
// 		error: -1,
// 		dirección: req.path,
// 		método: "no autorizado",
// 	});
// };
module.exports = { isAdmin, permiso };

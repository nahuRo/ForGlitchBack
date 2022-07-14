// Importar módulo fs
const fs = require("fs");

class Contenedor {
	constructor(name) {
		this.name = name;
	}
	async save(object) {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			objetos.push(object);
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(objetos, null, "\t")); // escribo en el txt los productos
			return "producto agregado";
		} catch (error) {
			console.log(`Hubo un error en - save PRODUCT: ${error}`);
		}
	}
	async update(id, obj) {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const indice = objetos.findIndex((item) => item.id === id);
			objetos.splice(indice, 1, { ...obj, id: id });
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(objetos, null, "\t"));
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async getById(id) {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const buscado = objetos.find((obj) => obj.id === id);
			console.log(buscado);
			return buscado;
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async getAll() {
		try {
			const objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			return objetos; // retorno un array de objetos
		} catch (error) {
			console.log(`Aun no generas el txt de Productos :( !!`);
		}
	}
	async deleteById(id) {
		try {
			let objetos = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			objetos = objetos.flatMap((item) => (item.id === id ? [] : item));
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(objetos, null, "\t"));
			return `Objeto con el id --> ${id} (eliminado)`;
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
}

class Cart {
	constructor(name) {
		this.name = name;
	}
	async save(object) {
		try {
			const cart = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const id = cart.length + 1;
			cart.push({ id, ...object });
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(cart, null, "\t")); // escribo en el txt los productos
			return `carrito creado con id --> ${id}`;
		} catch (error) {
			console.log(`Hubo un error en - save PRODUCT Cart: ${error}`);
		}
	}
	async deleteById(id) {
		try {
			let cart = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			cart = cart.flatMap((item) => (item.id === id ? [] : item));
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(cart, null, "\t"));
			return `Objeto con el id --> ${id} (eliminado)`;
		} catch (error) {
			console.log(`Hubo un error en - deleteByIdCart: ${error}`);
		}
	}
	async getById(id) {
		try {
			const cart = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			const buscado = cart.find((obj) => obj.id === id);
			return buscado || "no hay carrito";
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async updateCart(id, objNew) {
		try {
			const cart = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			cart.forEach((obj) => {
				if (obj.id === id) {
					console.log(obj);
					obj.productos.push({ ...objNew, id: obj.productos.length + 1 });
				}
			});
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(cart, null, "\t"));
			return objNew;
		} catch (error) {
			console.log(`Hubo un error en - getById: ${error}`);
		}
	}
	async deleteProdfromCart(id_Cart, id_Prod) {
		try {
			const cart = JSON.parse(await fs.promises.readFile(`./${this.name}`, "utf-8"));
			cart.forEach((obj) => {
				if (obj.id === id_Cart) {
					obj.productos = obj.productos.flatMap((item) => (item.id === id_Prod ? [] : item));
				}
			});
			await fs.promises.writeFile(`./${this.name}`, JSON.stringify(cart, null, "\t"));
			return "producto eliminado";
		} catch (error) {
			console.log(`Aun no generas el txt de Productos :( !!`);
		}
	}
}

module.exports = {
	GeneratorCart: Cart,
	GeneratorProd: Contenedor,
};

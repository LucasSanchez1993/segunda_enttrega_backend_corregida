
const fs = require('fs');

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
        this.products = [];

        if (fs.existsSync(this.path)) {
            const fileData = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(fileData);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let id = 1;

        if (this.products.length > 0) {
            id = this.products[this.products.length - 1].id + 1;
        }

        let newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);

        fs.writeFileSync(this.path, JSON.stringify(this.products));

        console.log("Cargo de producto");

        let lecturaProducto = fs.readFileSync(this.path, "utf-8");
        console.log(lecturaProducto);

        fs.appendFileSync(this.path, "\n\nProducto agregado");

        lecturaProducto = fs.readFileSync(this.path, "utf-8");
        console.log(lecturaProducto);

        setTimeout(() => {
            fs.unlinkSync(this.path);
        }, 2000);

        let exists = this.products.find(p => p.code === code);
        if (exists) {
            console.log(`El producto con este ${code} ya existe!!`);
            return;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
    updateProduct(id,newName) {
        let productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex].title = newName;
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log(`Producto con ID ${id} actualizado a: ${newName}`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}`);
        }
    }

    deleteProduct(id) {
        let productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            console.log(`Producto con ID ${id} eliminado.`);
        } else {
            console.log(`No se encontró ningún producto con el ID ${id}`);
        }
    }
}

let prodManager = new ProductManager('products.json');
prodManager.addProduct('arroz', 'blanco', 1000, 'img1', 1, 50);
prodManager.addProduct('leche', 'entera', 500, 'img2', 2, 30);

console.log("Hola");
console.log("Estos son los productos:", prodManager.getProducts());
console.log("Mi producto con ID 2 es:", prodManager.getProductById(2));

prodManager.updateProduct(1, 'garbanzo');
prodManager.deleteProduct(2);

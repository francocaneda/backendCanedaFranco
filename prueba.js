import productManager from './models/productManager.js'
import Producto from './models/producto.js'

function* generarID(id = 1){
    while(true){
        yield id;
        ++id;
    }
}

const generador = generarID();

const producto1 = new Producto("Peine", "Artículo accesorio", 500, "imagen pendiente" , 1, 50, generador.next())
const producto2 = new Producto("Royal Canin", "Artículo de alimento", 1200, "imagen pendiente" , 2, 40, generador.next())

const productManager1 = new productManager("Franco", "Caneda", 25)








if ((producto1.title, producto1.description, producto1.price, producto1.thumbnail, producto1.code, producto1.stock) != undefined) {
    productManager1.addProduct(producto1)
} else {
    console.log("No pueden faltar datos en los productos ingresados")
}


const agregarProduct = (code) => {
    const producto = productManager1.products.find((producto) => producto.code === code);
    if (producto)  {
        console.log("El CODE del producto ya se encuentra en la lista")
    } else if ((producto2.title, producto2.description, producto2.price, producto2.thumbnail, producto2.code, producto2.stock) != undefined) {
        productManager1.addProduct(producto2)
    } else {
        console.log("No pueden faltar datos en los productos ingresados")
    }
}

agregarProduct(producto2.code)



const getProducts = productManager1.products



const getProductByCode = (code) => {
    const producto = productManager1.products.find((producto) => producto.code === code);
    if (producto) {
        console.log(producto)
    } else {
        console.log("Not found.-")
    }
}

const getProductById= (id) => {
    const producto = productManager1.products.find((producto) => producto.id.value === id);
    if (producto) {
        console.log(producto)
    } else {
        console.log("Not found.-")
    }
}




//console.log(productManager1)
//console.log(getProducts)
//console.log(getProductById(5))



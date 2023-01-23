import productManager from './models/productManager.js'
import Producto from './models/producto.js'

function* generarID(id = 1){
    while(true){
        yield id;
        ++id;
    }
}

const generador = generarID();

const producto1 = new Producto("Peine", "Artículo accesorio", 500, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/peine.png?alt=media&token=b767443f-12a0-4150-b1d7-b3c2be33999c" , 1, 50, generador.next())
const producto2 = new Producto("Royal Canin", "Artículo de alimento", 1200, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/alimento.png?alt=media&token=e3c27ed3-fc1f-4f37-b027-bda03c510c0d" , 2, 40, generador.next())

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


//CASOS A TESTEAR SEGUN EL DESAFIO:

// Me devuelve por consola el Productor con los productos asignados:
//console.log(productManager1)

// Me devuelte el array con los productos agregados hasta el momento con un ID unico
//console.log(getProducts)

// Me devuelve el producto en caso de encontrarlo por ID o "Not Found" en caso contrario
//console.log(getProductById(2)) 



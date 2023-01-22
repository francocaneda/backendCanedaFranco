class productManager {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.products = []

    }
    
    
    addProduct(nuevoProducto) {
        this.products.push(nuevoProducto)
    }
    

    
}

export default productManager



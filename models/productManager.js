class Producto {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

    
}
class productManager {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.products = []

    }
    
    
    
    addProduct(newProduct){          
        
        if ((newProduct.title != undefined) && (newProduct.description != undefined) && (newProduct.price != undefined) && (newProduct.thumbnail != undefined) && (newProduct.code != undefined) && (newProduct.stock != undefined)){
            
            if (this.products.find(product=> product.code == newProduct.code))
            {
                console.log("El producto ya está en la lista");
            }
            else 
            {
                const idAutoincrementable = productManager.idAleatorio()
                this.products.push({...newProduct, id: idAutoincrementable});
            }        
        }else{
            console.log("No pueden faltar campos")
        }
       
    }

    getProducts(){
        return this.products;
    }


    static idAleatorio() {
        if (!this.idAnterior) {
          this.idAnterior = 1
        }
        else {
          this.idAnterior++
        }
        return this.idAnterior
      }

      getProductById= (id) => {
        if (this.products.find((producto) => producto.id === id) != undefined) {
            return this.products.find((producto) => producto.id === id)
        } else {
            return console.log("Not found.-")
        }
    }

}



const producto1 = new Producto("Peine", "Artículo accesorio", 500, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/peine.png?alt=media&token=b767443f-12a0-4150-b1d7-b3c2be33999c" , 1, 50)
const producto2 = new Producto("Royal Canin", "Artículo de alimento", 1200, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/alimento.png?alt=media&token=e3c27ed3-fc1f-4f37-b027-bda03c510c0d" , 2, 40)


const productManager1 = new productManager("Franco", "Caneda", 25)

productManager1.addProduct(producto1);
productManager1.addProduct(producto2);



// CASOS A TESTEAR:

// Me devuelve todos los productos del array
//console.log(productManager1.getProducts())

//Me busca el producto segun el ID ingresado
//console.log(productManager1.getProductById(1))


//Agrego un mismo producto y me lo rechaza porque ya esta en el array
//const producto3 = new Producto("Peine", "Artículo accesorio", 500, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/peine.png?alt=media&token=b767443f-12a0-4150-b1d7-b3c2be33999c" , 1, 50)
//console.log(productManager1.addProduct(producto3))



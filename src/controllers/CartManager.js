import fs from "fs";



class Cart {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}

export class CartManager {
    constructor(path) {
        this.path = path;
        this.carritos = [];
    }
    checkArchivo = () => {
        return fs.existsSync(this.path)
    }
    crearArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    crearCarritoVacio = async () => {
        let contenido = await fs.promises.readFile(this.path, "utf-8");
        let aux = JSON.parse(contenido);
        if (aux.length > 0) {
            const idAleatorio = aux[aux.length - 1].id + 1; 
            let carrito = new Cart(idAleatorio, []);
            aux.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
            return `Carrrito vacio creado con id= ${idAleatorio}`
        } else {
            const idAleatorio = 1;
            let carrito = new Cart(idAleatorio, []);
            aux.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
            return `Carrrito vacio creado con id= ${idAleatorio}`
        }
    }
    existsProductById= async(id)=> { //Solamente para comprobar si existe
        let contenido = await fs.promises.readFile("src/models/products.json", 'utf-8')  
        let aux = JSON.parse(contenido)
        let valor=false;
        if(aux.some(product=> product.id === id)) 
        {
            valor=true;        
        }else{
            valor=false;
        }        
        return valor;
    }

    addProductToCart = async (idCart,idProduct, quantity) => {
        let contenido = await fs.promises.readFile(this.path, "utf-8");
        let carritos = JSON.parse(contenido);
        let index = carritos.findIndex(cart => cart.id ===idCart);
        const existe = await this.existsProductById(idProduct)

        
        let responseAwaitProducts = await fs.promises.readFile("src/models/products.json", 'utf-8')  
        let arrayProductosFromJSON = JSON.parse(responseAwaitProducts);
    

        if(carritos[index]){
            if (existe){

                let aux = carritos[idCart-1].products;
                let index = aux.findIndex(product => product.idProduct ===idProduct);

                let pos = arrayProductosFromJSON.findIndex(product => product.id === idProduct)
                let productoJSON = arrayProductosFromJSON[pos];
                if (index!=-1){
                    if (productoJSON.stock>0 && productoJSON.stock >= carritos[idCart-1].products[index].quantity+quantity) 
                    {
                        carritos[idCart-1].products[index].quantity+=quantity;   
                        await fs.promises.writeFile(this.path, JSON.stringify(carritos));                
                        return "Agregado al carrito"
                    }else{
                        return "Sin Stock"
                    }
                }
                else
                {
                    if (productoJSON.stock>0 && productoJSON.stock >= quantity ) 
                    {
                        carritos[idCart-1].products.push({idProduct,quantity});
                        await fs.promises.writeFile(this.path, JSON.stringify(carritos));                
                        return "Item agregado al carrito"
                    }else{
                        return "No hay stock suficiente"
                    }
                }
            }else{
                return "No existe un producto con el id: "+idProduct
            }

        }else{
            return "Producto no encontrado"
        }
      

    }
    getAllCarts= async()=> { 
        if (this.checkArchivo()){                        
            let contenido = await fs.promises.readFile(this.path, 'utf-8')  
            return JSON.parse(contenido);
        }else{
            return "No hay productos a mostrar"
        }
    }
    getAllCartProducts= async(idCart)=> {
        if (this.checkArchivo()){
            
            
            let contenido = await fs.promises.readFile(this.path, 'utf-8')  
            let arrayCarritos = JSON.parse(contenido);
            let index = arrayCarritos.findIndex(cart => cart.id ===idCart);

            if (arrayCarritos[index]){
                let aux = JSON.parse(contenido)     
                let carrito = aux.find(carritos => carritos.id===idCart)   
                if (carrito.products.length>0){
                    return carrito.products
                }else
                {
                    return "No hay productos a mostrar"
                }
            }else{
                return "No existe el carrito"
            }

        }else{
            return "No existe el archivo"
        }
       
    }
    deleteProductById= async(cid,pid)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let arrayCarritos = JSON.parse(contenido)
        if (arrayCarritos.some(cart => cart.id === cid))
        {
            const pos = arrayCarritos.map(carrito => carrito.id).indexOf(cid);
            let objetoCarrito = arrayCarritos[pos]

            if (objetoCarrito.products.find(product => product.idProduct === pid))
            {                
                arrayCarritos[pos].products=objetoCarrito.products.filter(product => product.idProduct != pid)     
                await fs.promises.writeFile(this.path, JSON.stringify(arrayCarritos))      
                return "Producto eliminado."
            }else{
                return "No existe el producto a eliminar"
            }
        }else{
            return "No existe el carrito"
        }

      
    }
}
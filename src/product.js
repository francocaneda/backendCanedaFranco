import fs from "fs";
//const ruta = "./archivoTesteo.txt";




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
    constructor(path) {
        this.path = path;

    }
    chequeoArchivo = ()=>{
        return fs.existsSync(this.path)       
    }
    nuevoArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    
    
    
    addProduct = async (newProduct) => {          
        
        if ((newProduct.title != undefined) && (newProduct.description != undefined) && (newProduct.price != undefined) && (newProduct.thumbnail != undefined) && (newProduct.code != undefined) && (newProduct.stock != undefined)){
            
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(contenido);
            const tituloAuxiliar = products.find(product => product.code === newProduct.code);

            if (tituloAuxiliar)
            {
                
                console.log(`El producto "${tituloAuxiliar.title}" ya está en la lista`);
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let auxiliar = JSON.parse(contenido);

                if (auxiliar.length>0){
                    const idAleatorio = auxiliar[auxiliar.length-1].id+1; 
                    auxiliar.push({ ...newProduct, id: idAleatorio });
                    await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));
                }
                else{
                    const idAleatorio = 1;
                    auxiliar.push({ ...newProduct, id: idAleatorio });
                    await fs.promises.writeFile(this.path, JSON.stringify(auxiliar));
                }
            }        
        }else{
            console.log("No pueden faltar campos")
        }
       
    }

    getProducts = async() => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8') 
        let auxiliar = JSON.parse(contenido)
        return auxiliar;  
    }


    getProductById = async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let auxiliar = JSON.parse(contenido)
        if(auxiliar.some(product=> product.id === id)) 
        {
            let pos = auxiliar.findIndex(product => product.id === id)
            return auxiliar[pos];
        }else{
            return console.log("Producto no identificado.")
        }        
    }


    updateProduct = async({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let auxiliar = JSON.parse(contenido)
        const tituloAuxiliar = auxiliar.find(product => product.id === id);
        if(auxiliar.some(product=> product.id === id)) {
            let pos = auxiliar.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    auxiliar[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    auxiliar[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    auxiliar[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    auxiliar[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    auxiliar[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    auxiliar[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(auxiliar))
            console.log(`El producto "${tituloAuxiliar.title}" fue actualizado.`);
        } else {
            console.log( "No hay productos para actualizar.")
        }
    
    }

    deleteProductById = async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let auxiliar = JSON.parse(contenido)
        if(auxiliar.some(product=> product.id === id))
        {
            const arrayNuevo = auxiliar.filter(product => product.id != id);
            const tituloAuxiliar = auxiliar.find(product => product.id === id);
            await fs.promises.writeFile(this.path, JSON.stringify(arrayNuevo))
            console.log(`El producto "${tituloAuxiliar.title}" fue eliminado.`);
        }else{
            console.error("No se encontró el producto.")
        }        
    }

    cargarArchivo = async () => {
        
        await this.addProduct(producto1);
        await this.addProduct(producto2);

    }

}

const producto1 = new Producto("Peine", "Artículo accesorio", 500, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/peine.png?alt=media&token=b767443f-12a0-4150-b1d7-b3c2be33999c" , 1, 50)
const producto2 = new Producto("Royal Canin", "Artículo de alimento", 1200, "https://firebasestorage.googleapis.com/v0/b/backend-4a800.appspot.com/o/alimento.png?alt=media&token=e3c27ed3-fc1f-4f37-b027-bda03c510c0d" , 2, 40)

export default productManager;












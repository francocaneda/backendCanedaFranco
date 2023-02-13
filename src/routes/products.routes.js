import { Router } from "express";
const routerProduct = Router();
import { ProductManager } from "../controllers/ProductManager.js"
const manager = new ProductManager('src/models/products.json');



routerProduct.get("/", async (req, res) => {
    
    try{
        const products = await manager.getProducts();
        if (products.length>0){
            let { limit } = req.query;
            let data;
            if (!limit) {
                data = products;
            } else {
                data = products.slice(0, parseInt(limit));
            }
            res.send(data);
        }else{
            res.send("No hay productos en el archivo")
        }
    }catch(error){
        res.send("Probablemente no exista el archivo")
    }


});

routerProduct.get("/:pid", async (req, res) => {
    try{
        const product = await manager.getProductById(parseInt(req.params.pid));
        JSON.stringify(product)
        if (product){
            
            res.send(product)
        }else{
            res.send("No se encontró el producto")
        }
    }catch{
        res.send("No existe dicho archivo.")
    }

});

routerProduct.put("/:pid", async (req, res) => {
    try{
        let response = await manager.updateProduct({title:req.body.title,description:req.body.description,price:req.body.price,thumbnail:req.body.thumbnail,code:req.body.code,stock:req.body.stock,status:req.body.status,category:req.body.category,id:parseInt(req.params.pid)})
        res.send(response)
        
    }catch{
        res.send("Error en el archivo")
    }


});

routerProduct.delete("/:pid", async(req,res)=>{
    try{
        let response= await manager.deleteProductById(parseInt(req.params.pid))
        res.send(response)
        res.send(`Producto eliminado`)
    }catch{
        res.send("Error en el archivo")
    }
});


routerProduct.post('/', async(req,res)=>{

    //let { title, description, price, thumbnail, code, stock, status, category} = req.body   Otra forma de hacerlo por destructuring
    try{
        //console.log(req.body)
        let respuesta = await manager.addProduct(req.body)
        res.send(respuesta)
        res.send("Producto agregado correctamente")
    }catch{
        res.send("Ha ocurrido un error en el archivo")
    }

})

export default routerProduct
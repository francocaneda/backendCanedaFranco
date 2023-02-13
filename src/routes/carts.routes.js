import { Router } from "express";
const routerCart = Router();
import {CartManager} from "../controllers/CartManager.js"
const manager = new CartManager('src/models/carts.json');


routerCart.get("/", async (req, res) => {
    try{
        res.send(await manager.getAllCarts())
    }catch{
        res.send("Error en el archivo")
    }

});


routerCart.get("/:cid", async (req, res) => {
    try{
        const response = await manager.getAllCartProducts(parseInt(req.params.cid))
        res.send(response)
    }catch{
        res.send("Error en el archivo")
    }

});

routerCart.post("/", async (req, res) => {
    if (!manager.chequeoArchivo()){
        await manager.nuevoArchivo();
    }
    try {        
        res.send(await manager.crearCarritoVacio())
    }catch{
        res.send("Error en el archivo")
    }

});




routerCart.post("/:cid/product/:pid", async (req, res) => {
    try{
        let respuesta = await manager.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid),1) 
        res.send(respuesta)
    }catch{
        res.send("Error en alguno de los archivos")
    }

});

routerCart.delete("/:cid/product/:pid", async (req, res) => {
    try{
        let respuesta = await manager.deleteProductById(parseInt(req.params.cid),parseInt(req.params.pid),1) 
        res.send(respuesta)
    }catch{
        res.send("Error en alguno de los archivos")
    }

});







export default routerCart;
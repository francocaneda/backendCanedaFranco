import product from "./product.js";
import express from "express";

const app = express();
const PORT = 4000;
const productor = new product("./src/datos.json");

app.use(express.urlencoded({ extended: true }));


app.get("/", async(req, res) => {
    res.send("Desafio 3 ---> Servidores");
    if (!productor.chequeoArchivo()){
        await productor.nuevoArchivo(); 
    }
});

app.get("/products", async (req, res) => {
    if (!productor.chequeoArchivo()){
        await productor.nuevoArchivo(); 
    }
    const products = await productor.getProducts();
    if (products.length > 0){
        let { limite } = req.query;
        let data;
        if (!limite) {
            data = products;
        } else {
            data = products.slice(0, parseInt(limite));
        }
        res.send(data);
    }else{
        res.send("No existen productos en la base.")
    }

});




app.get("/products/:userId", async (req, res) => {
    if (!productor.chequeoArchivo()){
        await productor.nuevoArchivo(); 
    }
    const product = await productor.getProductById(parseInt(req.params.userId));
    JSON.stringify(product)
    if (product){
        
        res.send(`Producto: "${product.title}". Descripción: ${product.description } ----> Precio $${product.price} `)
    }else{
        res.send("No se encontró el producto")
    }
});





app.listen(PORT, () => {
    console.log(`Server on port:${PORT}`);
});

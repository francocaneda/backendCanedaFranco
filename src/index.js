import express from "express";
import { __dirname, __filename } from "./path.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js"
import multer from "multer";



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"src/public/img");        
    },
    filename: (req,file,cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Rutas
app.use('/static', express.static(__dirname + '/public')) 
app.use("/api/products", routerProduct)
app.use("/api/carts", routerCart)
app.post("/upload",upload.single("product"),(req,res)=>{
    res.send("Imagen Cargada")
})


app.listen(PORT, () => {
    console.log(`Server on port:${PORT}`);
});

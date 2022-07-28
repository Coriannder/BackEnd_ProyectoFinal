const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
const Router = require('express');


//-------------------Productos-----------------------//

const routerProductos = Router();
app.use('/api/productos', routerProductos)
routerProductos.use(express.json())

const {Contenedor, items} = require('./contenedor')
contenedorProductos = new Contenedor('productos.txt')
contenedorProductos.guardarItem(items[2])
contenedorProductos.guardarItem(items[3])


routerProductos.get('/:id?', (req,res)=>{
    const id = req.params.id
    if(id){
        res.json(contenedorProductos.getById(Number(id)))
    }else{
        res.json(contenedorProductos.getAll())
    }
})

routerProductos.post('/', (req,res)=>{
    contenedorProductos.guardarItem(req.body)
    //res.send('Producto guardado')
    res.json(req.body)
    
})

routerProductos.put('/:id', (req, res) =>{
    const isUpdate = contenedorProductos.updateItem(Number(req.params.id), req.body)
    if(isUpdate){
        res.json(contenedorProductos.getAll())
    }else{
        res.json("Producto no encontrado")
    }
})

routerProductos.delete('/:id', (req,res)=>{
    const isDelete = contenedorProductos.deleteItem(Number(req.params.id))
    if(isDelete){
        res.json(contenedorProductos.getAll())
    }else{
        res.send('Producto no encontrado')
    }

})



//---------------------Carritos------------------//

const routerCarrito = Router();
app.use('/api/carrito', routerCarrito)
routerCarrito.use(express.json())
contenedorCarritos = new Contenedor('carritos.txt')




const PORT = 8080

const server = app.listen(process.env.PORT || 8081, ()=>{
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})


const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())


const {routerProductos} = require('../routes/productos')
app.use('/api/productos', routerProductos)

const {routerCarrito} = require('../routes/carritos')
app.use('/api/carrito', routerCarrito)


const PORT = 8080

const server = app.listen(process.env.PORT || 8081, ()=>{
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})


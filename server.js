const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())


const {routerProductos} = require('./routes/productos')
app.use('/api/productos', routerProductos)

const {routerCarrito} = require('./routes/carritos')
app.use('/api/carrito', routerCarrito)


app.use((req, res) => {
    res.status(404).send({ error : -2, descripcion: `ruta ${req.url} con método ${req.method} no implementada`});
})


const PORT = 8080

const server = app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})


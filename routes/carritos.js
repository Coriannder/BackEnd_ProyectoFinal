const Router = require('express');
const routerCarrito = Router();


const {Contenedor} = require('../src/contenedores/contenedor')
//const contenedorProductos = require('../routes/productos')
contenedorCarritos = new Contenedor('carritos.txt')


contenedorCarritos.guardarItem(    // cargo un carrito de prueba
    [
        {id: 1, nombre: 'lapicera', descripcion: 'lapicera azul', codigo: 'lap01234', foto: 'http//kjdhlksugdli', precio: 500, stock: 10 },
        {id: 2, nombre: 'regla', descripcion: 'regla transparente', codigo: 'lap01235', foto: 'http//kugytoulksugdli', precio: 650, stock: 10 }
    ])

routerCarrito.post('/', (req,res)=>{            // Genera carrito y devuelve su id
    const id = contenedorCarritos.guardarItem() // Guarda un item (en este caso un carrito vacio) y entrega su id
    res.json('idCart: '+ id)
})

routerCarrito.delete('/:id', (req,res)=>{       // Elimina un carrito por su id
    const isDelete = contenedorCarritos.deleteItem(Number(req.params.id))
    if(isDelete){
        res.send('Carrito Eliminado')
    }else{
        res.send('Carrito no encontrado')
    }
})

routerCarrito.get('/:id/productos', (req,res)=>{  // Muestra Los productos de un carrito encontrado por su id
    const carrito = contenedorCarritos.getById(Number(req.params.id))
    if(carrito){
        res.json(carrito)
    }else{res.send('Carrito no encontrado')}
  
})

routerCarrito.post('/:id/productos', (req,res)=>{     // Incorpora un producto a un carrito
    let carrito = contenedorCarritos.getById(Number(req.params.id))
    if(carrito){
        const indice = carrito.item.findIndex(elem => elem.id === Number(req.body.id))
        if(indice !== -1){
        carrito.item[indice] = req.body
        }else{
        carrito.item.push(req.body)
        }
        contenedorCarritos.updateItem(Number(req.params.id), carrito.item)
        res.json(carrito.item)
    }else res.send('Carrito no encontrado')
})

routerCarrito.delete('/:id/productos/:id_prod', (req,res)=>{    //Elimina un producto del carrito por su id de carrito y de producto
    let carrito = contenedorCarritos.getById(Number(req.params.id))
    if(carrito){
        const index = carrito.item.findIndex(elem => elem.id === Number(req.params.id_prod))
        if(index !== -1){
            carrito.item.splice(index, 1)
            contenedorCarritos.updateItem(Number(req.params.id), carrito.item)
            res.send('Producto Eliminado')
        }else{
            res.send('Producto no encontrado')
        }
    }else{res.send('Carrito no encontrado')}
})

module.exports = {routerCarrito}
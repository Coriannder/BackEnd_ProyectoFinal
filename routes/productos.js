const Router = require('express');
const routerProductos = Router();

const {Contenedor} = require('../src/contenedores/contenedor')
contenedorProductos = new Contenedor('productos.txt')

//Cargo 2 productos de prueba
contenedorProductos.guardarItem({nombre: 'lapicera', descripcion: 'lapicera azul', codigo: 'lap01234', foto: 'http//kjdhlksugdli', precio: 500, stock: 10 })
contenedorProductos.guardarItem({nombre: 'regla', descripcion: 'regla transparente', codigo: 'lap01235', foto: 'http//kugytoulksugdli', precio: 650, stock: 10 })

const {onlyAdmins} = require('../src/utils/onlyAdmins')


routerProductos.get('/:id?',(req,res)=>{   // Si hay parametro obtiene producto por id, si no hay obtiene todos los productos
    const id = req.params.id
    if(id){
        res.json(contenedorProductos.getById(Number(id)))
    }else{
        res.json(contenedorProductos.getAll())
    }
})

routerProductos.post('/', onlyAdmins ,(req,res)=>{         // Agrega un producto
    contenedorProductos.guardarItem(req.body)
    res.send('Producto guardado')
})

routerProductos.put('/:id', onlyAdmins ,(req, res) =>{        // Actualiza un producto por su id
    const isUpdate = contenedorProductos.updateItem(Number(req.params.id), req.body)
    if(isUpdate){
        res.json('Producto Actualizado')
    }else{
        res.json("Producto no encontrado")
    }
})

routerProductos.delete('/:id', onlyAdmins ,(req,res)=>{       // Elimina un producto por su id
    const isDelete = contenedorProductos.deleteItem(Number(req.params.id))
    if(isDelete){
        res.json('Producto borrado')
    }else{
        res.send('Producto no encontrado')
    }

})

module.exports = {routerProductos}


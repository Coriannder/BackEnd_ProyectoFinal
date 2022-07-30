
const isAdmin = false

const onlyAdmins = (req, res, next)=>{
    isAdmin
    ?
    next()
    :
    res.send({ error : -1, descripcion: `ruta ${req.url} con método ${req.method} no autorizada` })
}


module.exports = {onlyAdmins}
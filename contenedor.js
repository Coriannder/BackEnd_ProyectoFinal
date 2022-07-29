const fs = require('fs')

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
        this.id = 0;
        this.crearArchivoSync()
        this.arrayItems = []
    }

    crearArchivoSync(){
        try {
            if(!fs.existsSync(this.fileName)){
                fs.writeFileSync(this.fileName, '')
            }
        } catch(error) {
            console.log(error)
        }
    }

    leerArchivo(){
        let archivoLeido = fs.readFileSync(this.fileName, 'utf8')
        if(archivoLeido == undefined) archivoLeido = "{}";
        return archivoLeido;
    }

    getAll(){
        return JSON.parse(this.leerArchivo())
    }

    guardarItem(item){
        this.id++
        this.arrayItems.push({id: this.id, timestamp: Date.now(), item })
        fs.writeFileSync(this.fileName, JSON.stringify(this.arrayItems, null, 2))
        return this.id
    }
    getById(id){
        let item = this.getAll().find(elem => elem.id === id)
        if(item == undefined) item = false
        return item;
    }

    getRandom(){
        let idRandom = Math.floor(Math.random()*(this.getAll().length))+1
        return (this.getById(idRandom))
    }

    updateItem(id, item){
        const indice = this.getAll().findIndex(elem => elem.id === id)
        if(indice !== -1){
            this.arrayItems[indice] = {id: id, timestamp: Date.now(), item}
            fs.writeFileSync(this.fileName, JSON.stringify(this.arrayItems, null, 2))
            return true
        }else{
            return false
        }
    }

    deleteItem(id){
        const indice = this.getAll().findIndex(elem => elem.id === id)
        if(indice !== -1){
            this.arrayItems.splice( indice, 1)
            fs.writeFileSync(this.fileName, JSON.stringify(this.arrayItems, null, 2))
            return true
        }else{
            return false
        }

    }
}


module.exports = {Contenedor}
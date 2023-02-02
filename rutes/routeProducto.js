import express, {Router, json, urlencoded} from 'express'



const routerProductos = express.Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

routerProductos.get('/', (req, res) => {

})




export default routerProductos

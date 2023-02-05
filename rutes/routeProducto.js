import express, {Router, json, urlencoded} from 'express'
import { faker } from '@faker-js/faker';
faker.locale ='es'

const routerProductos = express.Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

routerProductos.get('/', (req, res) => {

    let objetos = []
    for (let i = 0; i < 5; i++ ) {  
        let nombre = faker.commerce.productName()
        let precio = faker.commerce.price(1000,6000,0,'$')
        let foto = faker.internet.domainName()
        objetos.push({nombre, precio, foto})
    }
    console.log(objetos)
    res.render('tabla.handlebars', {objetos})

})

//{nombre: 'diego', precio: 1000, foto:'www.loquyese.com'}


export default routerProductos

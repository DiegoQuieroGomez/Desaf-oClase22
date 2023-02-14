import express, {json, urlencoded} from 'express'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'
import cookieParser from 'cookie-parser'
import path from 'path'
import routerProductos from './rutes/routeProducto.js'
import * as cr from './contenedor/connection.js'
import * as model from './models/mensajes.js'
import * as cu from './contenedor/contenedorUsers.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
//import sessionFileStore from 'session-file-store'


const app = express()
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const PORT = 8080
const srv = app.listen(PORT, () => console.log(`El servidor websocket esta corriendo en el puerto ${srv.address().port}`))
srv.on("error", error => console.log(`Error en el servidor ${error}`))

const io = new IOServer(srv)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/api/productos-test', routerProductos)
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coder:coder123456@cluster0.x6oicff.mongodb.net/chat?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
        
    }),
    secret: 'shhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
         maxAge: 60000
    }
}))

//cu.crearUsuario("diego","1234")
//cu.crearUsuario("laura","1234")

let mensajes = []
cr.listarMensajes(mensajes)

io.on("connection", function (socket) {
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes', mensajes)

    socket.on("nuevoMensaje", function (data) {
        //let mix = data
        cr.crearMenajes(data)
    // para save en connection    
    /*try {
        const mensaje = new model.mensajes({
            author: {
                id: mix.id,
                apellido: mix.apellido,
                nombre: mix.nombre,
                edad: mix.edad,
                alias: mix.alias,
                avatar: mix.avatar,
            },
            text: mix.text
        })
        console.log(mensaje)
        mensaje.save()

    } catch (error) {

        console.log(error)
        
    }
    */    
       
        mensajes.push(data)
        console.log(mensajes)
        io.sockets.emit("mensajes", mensajes);
    });
})

//crear usuarios


const getNombreSessin = req => req.session.nombre ? req.session.nombre: ''
/*
app.get('/',(res,req) =>{
    res.send('index.html')
})
*/

app.post('/formChat', (req, res) =>{
    let nombre = req.body
    console.log(nombre)
    req.session.nombre = nombre
    res.redirect('/view/index2.html')
})

/*
app.get('/form', (req, res) => {
    res.redirect("/view/index2.html");
})

*/
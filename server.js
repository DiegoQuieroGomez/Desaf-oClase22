import express, {json, urlencoded} from 'express'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'
import { dirname } from 'path'
import routerProductos from './rutes/routeProducto.js'
import * as cr from './connection.js'
import * as model from './models/mensajes.js'


const app = express()

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


let mensajes = []
cr.listarMensajes(mensajes)

io.on("connection", function (socket) {
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes', mensajes)

    socket.on("nuevoMensaje", function (data) {
        console.log(data)
        let mix = data
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



app.get('/', (req, res) => {
    res.send('index.html')
})

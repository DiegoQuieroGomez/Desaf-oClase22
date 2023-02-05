import express, {json, urlencoded} from 'express'
import { engine } from 'express-handlebars'
import { Server as IOServer } from 'socket.io'
import { dirname } from 'path'
import routerProductos from './rutes/routeProducto.js'

const app = express()

const PORT = 8080
const srv = app.listen(PORT, () => console.log(`El servidor websocket esta corriendo en el puerto ${srv.address().port}`))
srv.on("error", error => console.log(`Error en el servidor ${error}`))

const io = new IOServer(srv)

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/api/productos-test', routerProductos)
app.use(express.static("public"))
app.use(json())
app.use(urlencoded({extended:true}))



let mensajes = []

io.on("connection", function (socket) {
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes', mensajes)

    socket.on("nuevoMensaje", function (data) {
        mensajes.push(data);
        console.log(mensajes)
        io.socket.emit("mensajes", mensajes);
    });
})

app.get('/', (req, res) => {
    res.render('index.html')
})

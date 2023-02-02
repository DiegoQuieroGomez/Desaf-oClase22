import express from 'express'
import {engine} from 'express-handlebars'
import {Server as IOServer} from 'socket.io'
import  { dirname } from 'path'
import routerProductos from './rutes/routeProducto.js'
 
const app = express()
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/api/productos-test')
const PORT = 8080

const srv = app.listen(PORT, () => console.log(`El servidor websocket esta corriendo en el puerto ${srv.address().port}`))
srv.on("error", error => console.log(`Error en el servidor ${error}`))

const io = new IOServer(srv)


io.on('connection', function(data){
    console.log('Nuevo cliente conectado')

    socket.on("new-message", function (data) {
        mensajes.push(data);
      
        io.sockets.emit("mensajes", mensajes);
      });
})


app.get('/', (req, res) => {
    res.render('contenido.handlebars')
})

import mongoose from "mongoose"
import * as model from "./models/mensajes.js"

mongoose.set('strictQuery', false)

const URL = 'mongodb+srv://coder:coder123456@cluster0.x6oicff.mongodb.net/chat?retryWrites=true&w=majority'
mongoose.connect(URL, {}, error => {
    if (error) throw new Error(`Error en la conexion de la base de datos ${error}`)
    console.log('Base de datos conectada')
})




    export async function listarMensajes() {

        const mensajes = model.mensajes.find({})
        console.log(mensajes)
    }

    export async function crearMenajes(mensaje) {
        model.mensajes.save({
            author: {
                id: mensaje.id,
                nombre: mensaje.nombre,
                apellido: mensaje.apellido,
                edad: mensaje.edad,
                alias: mensaje.alias,
                avatar: mensaje.avatar,
            },
            text: mensaje.text

        }).then(() => console.log('Mensaje cargado correctamente'))
       

    }


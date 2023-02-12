import mongoose from 'mongoose'
import * as model from '../models/usuario.js'

const URL = 'mongodb+srv://coder:coder123456@cluster0.x6oicff.mongodb.net/chat?retryWrites=true&w=majority'
mongoose.connect(URL, {}, error => {
    if (error) throw new Error(`Error en la conexion de la base de datos ${error}`)
    console.log('Base de datos conectada')
})

export function crearUsuario(nombre, pass){
    model.users.create({
        nombre: nombre,
        contraseña: pass

    }).then(() => console.log('Usuario cargado correctamente'))
}


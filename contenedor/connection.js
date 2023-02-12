import mongoose from "mongoose"
import * as model from "../models/mensajes.js"



const URL = 'mongodb+srv://coder:coder123456@cluster0.x6oicff.mongodb.net/chat?retryWrites=true&w=majority'
mongoose.connect(URL, {}, error => {
    if (error) throw new Error(`Error en la conexion de la base de datos ${error}`)
    console.log('Base de datos conectada')
})

    export async function listarMensajes(array) {
        try{
        const mensajes = await model.mensajes.find({})

            array.push(JSON.stringify(mensajes))
            console.log(mensajes)
            console.log(array)
        }catch(error){
            console.log(error)
        }
      
    }


    export async function crearMenajes(mensaje) {
        model.mensajes.create({
        //model.mensajes.save({}) --- para el segundo metodo comentado en conexion    
            
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


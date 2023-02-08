import mongoose from 'mongoose'


const mensajesCollections = 'mensajes'

const MensajesSchema = new mongoose.Schema({
       mensaje: {
            author: {
                id: {type: String, require: true, max: 100},
                nombre: {type: String, require: true, max: 30},
                apellido: {type: String, require: true, max: 30},
                edad: {type: Number, require: true},
                alias: {type: String, require: true, max: 30},
                avatar: {type: String, require: true, max: 300},
            },
            text: {type: String, require: true, max: 300}       
       }
})

export const mensajes = mongoose.model(mensajesCollections, MensajesSchema)
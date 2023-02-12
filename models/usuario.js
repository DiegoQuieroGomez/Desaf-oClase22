import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const usersCollections = 'users'

const usersSchema = new mongoose.Schema({
        nombre:{type: String, require:true, max: 100},
        contraseña:{type: String, require: true},
        
})

export const users = mongoose.model(usersCollections,usersSchema)
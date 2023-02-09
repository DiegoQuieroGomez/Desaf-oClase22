import mongoose from "mongoose";

mongoose.set('strictQuery', false)

const productosCollections = 'productos'

const productosSchema = new mongoose.Schema({
        nombre:{type: String, require:true, max: 100},
        precio:{type: Number, require: true},
        foto:{type: String, require: true, max:300}
})

export const productos = mongoose.model(productosCollections,productosSchema)
import mongoose , { Schema } from 'mongoose';

const schema = new Schema({
  marca: String,
  precioMax: Number,
  precioMin: Number,
  precio: Number,
  nombre: String,
  categoria: String,
  presentacion: String,
  stock: Number
});
const Product = mongoose.model('Product', schema)

export default Product
import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
  marca: String,
  precioMax: Number,
  precioMin: Number,
  precio: Number,
  nombre: String,
  presentacion: String,
  stock: Number
});
interface IProduct extends Document {
  marca: string;
  precioMax: number;
  precioMin: number;
  precio: number;
  nombre: string;
  presentacion: string;
  stock: number;
}

export default model<IProduct>('Product', schema);
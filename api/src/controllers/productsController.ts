import Product from '../models/Product';
import { Request, Response } from 'express'
import axios from 'axios';
import alcohol from '../productosJson/bebidasConAlcohol';
import sinAlcohol from '../productosJson/bebidasSinAlcohol';
import congelados from '../productosJson/productosCongelados';
import almacen from '../productosJson/productosDeAlmacen';
import personal from '../productosJson/productosDeCuidadoPersonal';
import  frescos from '../productosJson/productosFrescos';
import limpieza from '../productosJson/productosLimpieza';
import  bebes from '../productosJson/productosParaBebes';
import mascotas from '../productosJson/productosParaMascotas';
import { idText } from 'typescript';




async function saveProduct(productData: any, category: string ) {
  try {
    // Check if the product already exists in the database
    let product = await Product.findOne({
      marca: productData.marca,
      nombre: productData.nombre,
      presentacion: productData.presentacion
    });
    if (product) {
      // If the product exists, update its price
      let newPrice: number = (productData.precioMax + productData.precioMin) / 2;
      if (newPrice !== product.precio) {
        product.precio = newPrice;
        await product.save();
        console.log(`Updated price for product ${product.nombre}`);
      } else {
        console.log(`Product ${product.nombre} already exists and has the same price`);
      }
    } else {
      // If the product does not exist, create a new one
      let newProduct= new Product({
        marca: productData.marca,
        precioMax: productData.precioMax,
        precioMin: productData.precioMin,
        precio: (productData.precioMax + productData.precioMin) / 2,
        nombre: productData.nombre,
        categoria: category,
        presentacion: productData.presentacion,
        stock: Math.floor(Math.random()*100) // Set the stock to a default value
      });
      await newProduct.save();
      console.log(`Created product ${newProduct.nombre}`);
    }
  } catch (error) {
    console.log('Error while saving product:', error);
  }
}

//charge or update DB
export function chargeOrUpdateDB(){
  const stock = [ alcohol, sinAlcohol, almacen, bebes, mascotas, frescos, congelados, personal, limpieza];
  for (let i = 0; i < stock.length; i++) {
    stock[i].productos.map((p: any) => {
      saveProduct(p, stock[i].categoria)
    })
  }
}
export async function getProducts (req: Request, res: Response) { 
  const { id } = req.params;
  try {
    if (id){
      const product = await Product.findById(id)
      return res.json(product)
    }else{
      const products = await Product.find()
      return res.json(products)
    }
  } catch (error:any) {
    res.send({message: "something went wrong", detail: error.message})
  }
}
export async function updateProduct (req: Request, res: Response) {
  const { id } = req.params;
  const { precioMax, precioMin, ingreso } = req.body;
  try {
    const product = await Product.findById(id)
    if(product){
      if(precioMax && precioMin){
        product.precioMax = precioMax;
        product.precioMin = precioMin;
        product.precio = (precioMax + precioMin) / 2
        res.json({ message: "Precio actualizado"})
      }else if(precioMax && product.precioMin){
        product.precioMax = precioMax;
        product.precio = (precioMax + product.precioMin) / 2 
        res.json({ message: "Precio Máximo y Precio actualizados"})
      } else if(precioMin && product.precioMax){
        product.precioMin = precioMin;
        product.precio = (product.precioMax + precioMin) / 2
        res.json({ message: "Precio Mínimo y Precio actualizados"})
      }
      if(ingreso){
        product.stock += ingreso
      }
      product.save()
    }
  } catch (error: any) {
    res.json({message: `El producto no pudo actualizarse ${error.message}`})
  }
}

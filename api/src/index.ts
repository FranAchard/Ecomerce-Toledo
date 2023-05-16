import app from './app'
import dotenv from 'dotenv';
import conn from './db';
import { chargeOrUpdateDB } from './controllers/productsController';
import productsRouter from './routes/productsRoutes';

dotenv.config()
const PORT = process.env.PORT

async function main(){
  conn();
  chargeOrUpdateDB();
  app.use('/api/products', productsRouter);
  await app.listen(PORT);
  console.log('server on port', PORT)
}

main();


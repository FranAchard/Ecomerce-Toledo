import app from './app'
import dotenv from 'dotenv';
import conn from './db'

dotenv.config()
const PORT = process.env.PORT

async function main(){
  conn()
  await app.listen(PORT);
  console.log('server on port', PORT)
}

main();


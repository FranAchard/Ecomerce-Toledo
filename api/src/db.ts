import mongoosee from "mongoose" ;
import dotenv from "dotenv";

dotenv.config()


const URI : any = process.env.MONGO_URI;

const connection = () => {
  mongoosee.set("strictQuery", false)
  mongoosee.connect(URI, {})
  
    .then(() => console.log("Database connected!"))
    .catch((err: any) => console.log(err))

}

export default connection
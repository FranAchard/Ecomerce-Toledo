import mongoose , { Schema } from 'mongoose';

const schema = new Schema({
  userName:{
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  code :{
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "UNVERIFIED",
  }
});
export const User = mongoose.model("User", schema);

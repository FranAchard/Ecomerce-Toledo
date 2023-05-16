import { Request, Response } from "express";
import { generateToken } from "../config/jwt.config";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { getTokenData } from "../config/jwt.config";
import { getTemplate, sendEmail } from "../config/mail.config";
import { v4 } from "uuid";
import dotenv from 'dotenv';

dotenv.config()
const BCRYPT_SALT_ROUNDS = 12;





// get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

// get user by id & get user by email para login
export const getUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
  if (email) {
      const search  = await User.find({email: email});
      let user = search[0]
      if (user){
        let validation = await bcrypt.compare(password, user.password)
        validation ? res.json(user) : res.send({msg: "Wrong password"}) 
    }else{
      res.send({ msg: "No user registered with this email" })
    }

  }
};

// create user

export const createUser = async (req: Request, res: Response) => {
  try {
    const { userName, name, lastName, email, password, done } = req.body;
    let user = await User.findOne({
      userName: userName,
    });
    let userEmail = await User.findOne({
      email: email,
    });
    let passwordHashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    if (user || userEmail) {
      return done(null, false, console.log("This user name already exists"));
    } else {
      const code = v4();
      let user = new User({ userName, name, lastName, email, code, password: passwordHashed });
      const token = generateToken({ email, code });
      const template = getTemplate(name, token);

      await sendEmail(email, "Confirm your account", template);
      await user.save();

      res.json({
        success: true,
        msg: "User successfully registered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Something went wrong. Registration has failed",
    });
  }
};
export const confirm = async (req: Request, res: Response) => {
  console.log("entro al confirm")
  try {
    const { token } = req.params;

    const data = getTokenData(token);

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error. Data couldn't be acccessed ",
      });
    }

    const { email, code } = data;
    let user = await User.findOne({
      email: email,
    });
    if (user === null) {
      return res.json({
        success: false,
        msg: "The user doesn't exist",
      });
    }
    if (code !== user.code) {
      return res.redirect("/error.html");
    }
    user.status = "VERIFIED";
    await user.save();
    return res.redirect("http://localhost:3000/home");
    //return res.redirect("")
  } catch (error) {
    return res.json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
};

// update user

export const updateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let passwordHashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  try {
    await User.findByIdAndUpdate(req.params.id, {
      // trae el usuario por id y actualiza email y passwor
      email,
      password: passwordHashed,
    });
    res.json({ message: " User updated successfully" });
  } catch (error) {
    res.json({ message: " Error updating user " });
  }
};

//delete user

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: " User deleted successfully" });
  } catch (error) {
    res.json({ message: " Error deleting user " });
  }
};
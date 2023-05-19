import { Request, Response } from "express";
import { generateToken } from "../config/jwt.config";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { getTokenData } from "../config/jwt.config";
import { templatePasswordChange, templateSignUp, sendEmail } from "../config/mail.config";
import { v4 } from "uuid";
import dotenv from 'dotenv';

dotenv.config()
const CLIENT = process.env.CLIENT
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
      const template = templateSignUp(name, token);

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
    return res.redirect(`${CLIENT}home`);
    //return res.redirect("")
  } catch (error) {
    return res.json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
};

// reset password

export const changePassword = async (req: Request, res: Response) => {
  console.log("entro al controlador")
  const { email, password } = req.body;
  let passwordHashed = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  try {
    const user = await User.findById(req.params.id)
      // trae el usuario por id y actualiza email y verifica que el email entregado coincide con el del usuario
      if(user?.email === email){
        let code = user?.code;
        const token = generateToken({ email, code, passwordHashed });
        const template = templatePasswordChange(user?.name, token);
        await sendEmail(email, "Confirm your password change", template);
      }
    res.json({ message: `An email was sent to ${email} to confirm the change` });
  } catch (error) {
    res.json({ message: " Oops something went wrong " });
  }
};

export const confirmPasswordChange = async (req: Request, res: Response) => {
  console.log('entro al controlador')
  try {
    const { token } = req.params;

    const data = getTokenData(token);

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error. Data couldn't be acccessed ",
      });
    }

    const { email, code, passwordHashed } = data;
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
    user.password = passwordHashed;
    await user.save();
    return res.redirect(`${CLIENT}home`);
  } catch (error) {
    return res.json({
      success: false,
      msg: "Error al modficar la contraseña",
    });
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
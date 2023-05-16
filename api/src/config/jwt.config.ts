import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;

export const generateToken = (payload: any) => {
  if (secret === undefined) {
    throw new Error("JWT_KEY not defined");
  } else {
    return jwt.sign(payload, secret || "", { expiresIn: "1h" });
  }
};

export const getTokenData = (token: string) => {
  let data: any = null;
  try {
    data = jwt.verify(token, secret || "");
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      data = { message: "Token expired" };
    } else if (error instanceof jwt.JsonWebTokenError) {
      data = { message: "Invalid token" };
    }
  }
  return data;
};

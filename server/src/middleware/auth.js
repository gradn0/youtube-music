import jwt from "jsonwebtoken"
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401);
  }

  const token = auth.split(" ")[1];
  
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({_id}).select("_id");
    next();
  } catch (error) {
    return res.status(401);
  }
}
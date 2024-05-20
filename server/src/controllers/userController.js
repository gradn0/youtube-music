import { User } from "../models/user.js"
import jwt from "jsonwebtoken"

const createWebToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

export const signup = async (req, res) => {
  const {email, password} = req.body;
  try {
    const newUser = await User.signup(email, password);
    const token = createWebToken(newUser._id);
    res.status(201).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.login(email, password);
    const token = createWebToken(user._id);
    res.status(201).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
import { User } from "../models/user.js";

export const signup = async (req, res) => {
  const {email, password} = req.body;
  try {
    const newUser = await User.signup(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

export const login = async (req, res) => {

}
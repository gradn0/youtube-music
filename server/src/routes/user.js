
import express from "express"
import { signup } from "../controllers/userController.js";
export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  signup(req, res);
});

userRouter.post("/login", (req, res) => {
  login(req, res);
});

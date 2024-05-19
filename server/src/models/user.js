import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true})

userSchema.statics.signup = async function (email, password) {
  const exists = await User.findOne({email: email})
  if (exists) {
    throw new Error("Email exists");
  }

  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
  const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  
  if (!emailRegex.test(email)) throw new Error("Invalid email");
  if (!passwordRegex.test(password)) throw new Error("Password to weak");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({email, password:hash});
  return user;
}

export const User = mongoose.model('user', userSchema);

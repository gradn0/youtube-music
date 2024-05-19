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
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const exists = await this.findOne({email: email})
  if (exists) {
    throw new Error("Email exists");
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

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({email});

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) return user;
  }
  
  throw new Error("Incorrect username or password");
}

export const User = mongoose.model('user', userSchema);

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

  const letterRegex = new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])/);
  const numberRegex = new RegExp(/(?=.*?[0-9])/);
  const specialRegex = new RegExp(/(?=.*?[0-9])/);
  const emailRegex = new RegExp(/(?=.*?[#?!@$%^&*-])/);

  if (!emailRegex.test(email)) throw new Error("Invalid email");
  if (password.length < 8) throw new Error("Password must be at least 8 characters");
  if (!letterRegex.test(password)) throw new Error("Password must contain an uppercase and lowercase letter");
  if (!numberRegex.test(password)) throw new Error("Password must contain a number");
  if (!specialRegex.test(password)) throw new Error("Password must contain a special character");

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

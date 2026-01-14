import User from "../models/users.Models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// register logic
export const register = async (req, res) => {
  const { name, email, password,role } = req.body;
 
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, Try to login" });
    }

if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // check if password contains at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one number and one special character",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10); // salt rounds

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role:role || "user"
    });
    return res
      .status(201)
      .json({
        message: "User registered successfully",
        User: newUser,
      });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error" });
  }
};


// login logic with jwt
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found, Please register" });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({
          message: "email or password are incorrect, please try again",
        });
    }

    // generate jwt token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role:existingUser.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // success response
    return res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error" });
  }
};
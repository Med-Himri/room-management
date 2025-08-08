const Otp = require("../models/otp");
const User = require("../models/User");
const authService = require("../services/user.service");
require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { cloudinaryUploadImage,cloudinaryRemoveImage } = require("../utils/cloudinary");

const bcrypt = require("bcrypt");

// register
// exports.register= async (req, res) => {
//   try {
//     const { name, email, password, phoneNumber } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload avatar if available
    let avatar = {};
    if (req.file) {
      const result = await cloudinaryUploadImage(req.file.path);
      avatar = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // You can generate token here (e.g., JWT)
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Profile 
// exports.updateUser = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedData = req.body;
//     const user = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove old avatar if new one is uploaded
    if (req.file) {
      if (user.avatar?.public_id) {
        await cloudinaryRemoveImage(user.avatar.public_id);
      }
      const result = await cloudinaryUploadImage(req.file.path);
      user.avatar = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
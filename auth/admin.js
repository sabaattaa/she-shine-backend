 
import { Product } from "../db/models/Products.js";
import { Collection } from "../db/models/Collection.js";
import { User } from "../db/models/User.js";

// Multer Storage Configuration


// Multer Middleware

// Route Handler
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      collection_id,
      isReturn,
      discount,
      start_date,
      end_date,
    } = req.body;

    // ✅ Check mandatory fields (basic extra protection)
    if (!name || !price || !quantity || !collection_id) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // ✅ File validations
    const thumbnail = req?.files?.["thumbnail"]?.[0];
    const media = req?.files?.["media"] || [];

    if (thumbnail && !thumbnail.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Thumbnail must be an image" });
    }

    for (const file of media) {
      if (!file.mimetype?.startsWith("image/")) {
        return res
          .status(400)
          .json({ message: "All media files must be images" });
      }
    }

    // ✅ Save product
    const product = await Product.create({
      name,
      price,
      quantity,
      collection_id,
      isReturn,
      discount,
      start_date,
      end_date,
      thumbnail: thumbnail
        ? {
            filename: thumbnail.filename,
            url: `${process.env.PRODUCT_IMAGE_URL}${thumbnail.filename}`,
          }
        : null,
      media: media.map((file) => ({
        filename: file.filename,
        url: `${process.env.PRODUCT_IMAGE_URL}${file.filename}`,
      })),
    });

    // ✅ Return clean response
    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error =>", error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// Route Handler

export const addCollection = async (req, res) => {
  try {
    const { name, collection_parent_id, isActive } = req.body;

    // ✅ Basic field validation
    if (!name) {
      return res.status(400).json({ message: "Collection name is required" });
    }

    // ✅ Optional: You can also validate collection_parent_id type or existence in DB if needed

    // ✅ Thumbnail validation
    const thumbnail = req?.file;

    if (thumbnail && !thumbnail.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Thumbnail must be an image" });
    }

    const thumbnailUrl = thumbnail
      ? `${process.env.COLLECTION_IMAGE_URL}${thumbnail.filename}`
      : null;

    // ✅ Create collection safely
    const newCollection = await Collection.create({
      name,
      collection_parent_id,
      isActive: isActive === "true" || isActive === true, // handle string booleans
      thumbnail: thumbnailUrl,
    });

    // ✅ Return clean response
    return res.status(201).json({
      message: "Collection added successfully",
      collection: newCollection,
    });
  } catch (error) {
    console.error("Add Collection Error =>", error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};





// Route Handler

import bcrypt from 'bcrypt';  
import validator from 'validator'; 

export const addUser = async (req, res) => {
  try {
    const { name, email, phone_no, password, role } = req.body;

    // ✅ Validate fields
    if (!name || !email || !phone_no || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isMobilePhone(phone_no, 'any')) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // ✅ File (image) validation
    const thumbnail = req?.file;
    if (thumbnail && !thumbnail.mimetype?.startsWith("image/")) {
      return res.status(400).json({ message: "Thumbnail must be an image" });
    }

    const thumbnailUrl = thumbnail
      ? `${process.env.PROFILE_IMAGE_URL}${thumbnail.filename}`
      : null;

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user
    const newUser = await User.create({
      name,
      email,
      phone_no,
      role,
      password: hashedPassword,
      thumbnail: thumbnailUrl,
    });

    // ✅ Send response without password
    return res.status(201).json({
      message: "User added successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone_no: newUser.phone_no,
        role: newUser.role,
        thumbnail: newUser.thumbnail,
      },
    });
  } catch (error) {
    console.error("Add User Error:", error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

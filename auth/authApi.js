import jwt from "jsonwebtoken";
import { User } from "../db/models/User.js";


const SECRET = process.env.JWT_SECRET || "jjhfhgfhfd6567rytdd&$@@^RWYY$$$HERWRHkhbyfbyudt"; 
export const Login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return response.status(401).json({
        status: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return response.status(200).json({
      status: 200,
      email: user.email,
      token,
      message: "Login successful",
    });

  } catch (error) {
    // Handle errors
    return response.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

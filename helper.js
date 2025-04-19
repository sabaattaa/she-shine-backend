import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.get("authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    console.log("key", process.env.JWT_SECRET)

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "jjhfhgfhfd6567rytdd&$@@^RWYY$$$HERWRHkhbyfbyudt");


    req.user = decoded; // You can access this in your route handler
    next(); // pass control to next middleware/route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

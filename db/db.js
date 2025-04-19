import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    const dbName = mongoose.connection.name;
    console.log("✅ MongoDB connected successfully",dbName);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop process if DB fails
  }
};

 
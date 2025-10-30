import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
  } catch (error) {
    console.error("loi", error);
    process.exit(1);
  }
};

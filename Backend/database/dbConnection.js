import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "HospitalManagementSystem", // match exact name from Compass (capitalization matters)
    })
    .then(() => {
      console.log("✅ Connected to MongoDB successfully!");
    })
    .catch((err) => {
      console.error("❌ Error connecting to MongoDB:", err.message);
      process.exit(1); // exit the app if connection fails
    });
};

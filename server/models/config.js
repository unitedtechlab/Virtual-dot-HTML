const mongoose = require("mongoose");

require("dotenv").config();
const uri = process.env.MONGODB_URI;

const options = {
  serverSelectionTimeoutMS: 10000,
};

// Connect to MongoDB
mongoose
  .connect(uri, options)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const routes = require("./router/routes");
const app = express();
app.use(cors());
app.use(express.json());

//Setting Up DB Connection
mongoose.connect(
  "mongodb+srv://sampreetg:sampreetg@samcluster.p1gitx0.mongodb.net/notes?retryWrites=true&w=majority&appName=SamCluster"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

//Initializing API Routes
//app.use("/api/notes", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

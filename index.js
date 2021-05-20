const express = require("express");
app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/mern-app-demo-db",
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => {
    console.log("connected to db");
  }
);

const router = require("./routes/API");
app.use("/api", router);

const PORT = process.env.PORT || 8080;

//set up static folder for rendering react app
app.use(express.static(path.join(__dirname, "frontend/build")));

//Handle any requests that doesn't target root url
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

const express = require("express");
app = express();
const mongoose = require("mongoose");
const cors = require("cors");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

app.use(express.static("frontend/build"));

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

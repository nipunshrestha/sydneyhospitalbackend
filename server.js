const express = require("express");
const cors = require("cors");

// creating a mongoose instance
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//use cors middleware
app.use(cors());

app.use(express.json());

//DB config
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established ");
});

const gameDataRouter = require("./routes/gameData");
const staffRouter = require("./routes/staff");
const loginRouter = require("./routes/login");
const parentRouter = require("./routes/parents");
const childRouter = require("./routes/child");

app.use("/api/gameData", gameDataRouter);
app.use("/api/staff", staffRouter);
app.use("/api/login", loginRouter);
app.use("/api/parents", parentRouter);
app.use("/api/child", childRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});

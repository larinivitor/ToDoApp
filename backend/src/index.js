const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { port, databaseURL } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(require("./api/routes"));

app.mongoose = mongoose;
app.mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(port, () => {
  console.log("API running on port", port);
});

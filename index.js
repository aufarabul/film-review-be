const express = require("express");
const router = require("./route");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.static("public"));

app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});
app.listen(port, () => console.log(`Server running on port ${port}`));

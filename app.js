const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/models");
const app = express();
const { localStrategy } = require("./middleware/passport");
const userRoute = require("./routes/users");

// middlewares
const passport = require("passport");

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
app.use(userRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

// ERROR HANDELING
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    app.listen(8002, () => {
      console.log("Hello the app is succesfully working");
    });
  } catch (error) {
    console.error(error);
  }
};
run();

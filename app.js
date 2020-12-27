// imports
//
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
//database
const db = require("./db/models");
// Routes
const userRoute = require("./routes/users");
const tripRoute = require("./routes/trips");
const profileRoute = require("./routes/profiles");
// middlewares
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const path = require("path");

// app
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
//Routes
app.use("/trips", tripRoute);
app.use("/profile", profileRoute);
// middleWare
app.use("/media", express.static(path.join(__dirname, "media")));
//User Route
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
    await db.sequelize.sync({ force: true });
    app.listen(8002, () => {
      console.log("Hello the app is succesfully working");
    });
  } catch (error) {
    console.error(error);
  }
};
run();

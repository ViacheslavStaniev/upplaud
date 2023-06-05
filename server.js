require("dotenv").config();
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

connectDB(); // Connect MongoDB

app.use(bodyParser.urlencoded({ extended: true }));

// Init Middleware
app.use(
  express.json({
    extended: false,
    limit: "50mb",
    parameterLimit: 50000,
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith("/api/checkout/webhook")) req.rawBody = buf;
    },
  })
);

const corsOptions = {
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Passport Auth
app.use(cookieParser());
app.use(session({ secret: process.env.PASSPORT_SECERT, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add headers
app.use(cors(corsOptions));
app.options("*", cors());

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/show", require("./routes/show"));
app.use("/api/users", require("./routes/users"));
app.use("/api/guests", require("./routes/guests"));
app.use("/auth/login", require("./routes/social_auth"));
app.use("/auth/connect", require("./routes/social_connect"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;

require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();

const { SERVER_URL, REACT_APP_URL, PORT, PASSPORT_SECERT } = process.env;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "frontend/public")));

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
  credentials: true,
  origin: [REACT_APP_URL, SERVER_URL],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Passport Auth
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: PASSPORT_SECERT,
    maxAge: 24 * 60 * 60 * 1000,
    cookie: { secure: true, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport serializeUser/deserializeUser
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Add headers
app.use(cors(corsOptions));
app.options("*", cors());

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/poll", require("./routes/poll"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/show", require("./routes/show"));
app.use("/api/files", require("./routes/files"));
app.use("/api/users", require("./routes/users"));
app.use("/api/guests", require("./routes/guests"));
app.use("/auth/login", require("./routes/social_auth"));
app.use("/auth/connect", require("./routes/social_connect"));

const LISTEN_PORT = PORT || 5000;

app.enable("trust proxy");

app.listen(LISTEN_PORT, () => console.log(`Server started on port ${LISTEN_PORT}`));
module.exports = app;

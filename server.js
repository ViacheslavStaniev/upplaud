require("dotenv").config();
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

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
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Passport Auth
app.use(cookieParser());
app.use(session({ secret: process.env.PASSPORT_SECERT, resave: true, saveUninitialized: true, cookie: { secure: true } }));
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
app.use("/api/auth", require("./routes/auth"));
app.use("/api/show", require("./routes/show"));
app.use("/api/users", require("./routes/users"));
app.use("/api/images", require("./routes/images"));
app.use("/api/guests", require("./routes/guests"));
app.use("/auth/login", require("./routes/social_auth"));
app.use("/auth/connect", require("./routes/social_connect"));

app.get("/poll/:id", (req, res) => {
  //Query on this poll id
  let pollId = req.params.id;

  let responseData = {
    title: "Dynamic Title",
    description: "Dynamic title",
    openGraph: {
      title: "OG title",
      description: "OG description",
      image: {
        url: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
        alt: "OG image alt",
      },
    },
  };
  console.log("req.params.id", req.params.id);
  res.render("index", { data: responseData });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;

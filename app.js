const express       = require('express'),
      bodyParser    = require("body-parser"),
      cookieParser  = require('cookie-parser'),
      session       = require('express-session'),
      connection    = require('./config'),
      app           = express();

  //requiring routes
var indexRoutes     = require("./routes/index"),
    dashboardRoutes = require("./routes/dashboard");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_skpuri',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));



app.use("/", indexRoutes);
app.use("/", dashboardRoutes);
//create server on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

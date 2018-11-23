var express                  = require("express"),
    router                   = express.Router(),
    connection               = require('../config'),
    middleware               = require("../middleware");


//Home page with login and signup form
router.get('/', middleware.sessionChecker, (req, res) => {
  res.render('home.ejs', {user: ''});
})

//to check wether user with particular email id exists or not
router.get('/user/:email', (req, res) => {
  var email = req.params.email;

  var sql = `SELECT * FROM user WHERE email = '${email}'`;
  connection.query(sql, function(err, result) {
    if (err)
      throw err;
    if (result.length === 0) {
      // if email id is not found
      return res.status(404).json({emailnotfound: "Email not found"});

    }
    // if email id exist in DB.
    return res.status(200).json({emailfound: "Email found"});
  });
})

// to add a new user
router.post('/adduser', (req, res) => {
  let name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      accounttype = req.body.type;
  var sql = `INSERT INTO user (name, email, password,type) VALUES ('${name}','${email}' ,'${password}','${accounttype}')`;
  connection.query(sql, function(err, user) {
    if (err)
      throw err;
      // after registeration trying to login
    var sql1 = `SELECT * FROM user WHERE email = '${email}' and password = '${password}' `;
    connection.query(sql1, (err, user) => {
      if (user.length == 0) {
        // console.log(user);
        return res.status(404).json({usernotfound: "Login credentials are worng"})
      } else {
        req.session.user = user;
        res.redirect('/dashboard');
      }
    })
  });

})


//login route
router.post('/login', (req, res) => {
  var email = req.body.email,
    password = req.body.password;
    //search for user with given email id and password
  var sql = `SELECT * FROM user WHERE email = '${email}' and password = '${password}' `;
  connection.query(sql, (err, user) => {
    if (user.length == 0) {
      // if user doesn't exist return 404
      return res.status(404).json({usernotfound: "Login credentials are worng"})
    } else {
      //if user exist create a session
      req.session.user = user;
      res.redirect('/dashboard');
    }
  })
})

//logout route
router.get('/logout', middleware.isloggedIn, (req, res) => {
  //if session and cookies exist
  if (req.session.user && req.cookies.user_skpuri) {
    res.clearCookie('user_skpuri'); //clear cookies
    res.redirect('/'); //redirect to login page
  } else {
    res.redirect('/');
  }
});
module.exports = router;

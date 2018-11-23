// all the middleare goes here
var middlewareObj = {};

// middleware function to check for logged-in users

// If session already exists redirect to dashboard else let it go
middlewareObj.sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_skpuri) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};
// If session doesn't exists redirect to login/home page else let it go
middlewareObj.isloggedIn = (req, res, next) => {
  if (!(req.session.user && req.cookies.user_skpuri)) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = middlewareObj;

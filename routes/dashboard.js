var express                  = require("express"),
    router                   = express.Router(),
    connection               = require('../config'),
    middleware               = require("../middleware"),
    mysql_real_escape_string = require("../public/javascript/escape-string.js");


router.get('/dashboard', middleware.isloggedIn, (req, res) => {
  //if user type is recruiter
  if (req.session.user[0].type == 2) {
    //select all jobs posted by that particular recruiter
    var sql = `SELECT * FROM jobs where company_id ='${req.session.user[0].id}'`;
    connection.query(sql, function(err, jobs, fields) {
      if (err)
        throw err;
      res.render('recruiter.ejs', {
        jobs: jobs,
        user: req.session.user[0]
      });
    });
  } else if (req.session.user[0].type == 1) {
    //If user type is job seeker
    // select all jobs
    var sql = "SELECT * FROM jobs";
    connection.query(sql, function(err, jobs, fields) {
      if (err)
        throw err;
      res.render('jobseeker.ejs', {
        jobs: jobs,
        user: req.session.user[0]
      });
    });
  }

})
// Get form for posting a Job
router.get('/dashboard/addjob', middleware.isloggedIn, (req, res) => {
  //Check if user type is recruiter
  if (req.session.user[0].type == 2) {
    //if recruiter
    res.render('addjob.ejs', {user: req.session.user[0]});
  } else {
    // if not recruiter redirect to dashboard
    res.redirect('/dashboard');
  }
})

//Post a Job.
router.post('/dashboard/addjob', middleware.isloggedIn, (req, res) => {
  var title = req.body.jobtitle;
  var company = req.body.company;
  var des = mysql_real_escape_string(req.body.des);
  var company_id = req.session.user[0].id;
  var applications = JSON.stringify([]);
  let date = Date(Date.now());
  var sql = `INSERT INTO jobs (job_title, company_name, description,applications, date, company_id) VALUES ('${title}','${company}' ,'${des}','${applications}','${date}','${company_id}')`;
  connection.query(sql, function(err, result) {
    if (err)
      throw err;
    // console.log("1 record inserted");
    res.redirect('/dashboard');
  });

})

//to apply for a job by loggedin user
router.get('/apply/:job_id', middleware.isloggedIn, (req, res) => {
  var sql = `SELECT * FROM jobs WHERE id = '${req.params.job_id}'`;4
  // retrive job with job_id
  connection.query(sql, function(err, job) {
    if (err)
      throw err;
    //retrive applications field and convert the string to array then add currentuser into array then update the data
    var aplicationarray = JSON.parse(job[0].applications);
    var currentuser = req.session.user[0];
    aplicationarray.push(currentuser);
    var stringapplication = JSON.stringify(aplicationarray)
    sql1 = `UPDATE jobs SET applications='${stringapplication}'  WHERE id='${req.params.job_id}'`;
    connection.query(sql1, function(err, job) {
      if (err)
        throw err;
      res.redirect('/dashboard');
    });
    // console.log(aplicationarray);
  });
})

module.exports = router;

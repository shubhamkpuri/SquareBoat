
// login function send ajax request and checks if the credientials are correct
//if credientials are correct make login and redirect to dashboard
// if credentials are not correct make show credentials doesn't match
function login() {
  event.preventDefault();
  // retrieve values from textfields
  var li_email = document.getElementById('li_email').value.trim();
  var li_pwd = document.getElementById('li_pwd').value.trim();
  let error = 0;
// make ajax call to login url email nd password to match from DB
  var url = `http://localhost:5000/login`;
  fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        email: li_email,
        password: li_pwd
      })
    })
    .then(function(res) {
      console.log(res);
      if(res.status == 200){
        // If credentials match redirect to dashboard
      window.location = "http://localhost:5000/dashboard";
    }else if(res.status==404){
      //if credentials don't match then show error
        document.getElementById('loginerror').innerHTML = 'Login credientials are not correct';
    }
    })
    .catch(function(res) {
      //If any other error occurs
      document.getElementById('loginerror').innerHTML = 'Login credientials are not correct';
      console.log(res)
    });
}

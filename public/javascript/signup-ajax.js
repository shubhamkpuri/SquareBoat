
// signup function send ajax request and checks if the user id already registered or not
//if not registered then create a new user and redirect to dashboard
// if already registered show user already exist.

function createuser() {
  event.preventDefault();
  // get values from textfields
  var su_name = document.getElementById('su_name').value.trim();
  var su_email = document.getElementById('su_email').value.trim();
  var su_pwd = document.getElementById('su_pwd').value.trim();
  var su_type = document.getElementById('su_type').value;
  let error = 0;
  // Basic length validations
  if (su_name.length <= 2) {
    error = 1;
    document.getElementById('nameerror').innerHTML = 'Should be minimum of 3 characters';
  }
  if (su_pwd.length < 4) {
    error = 1;
    document.getElementById('su_pwderror').innerHTML = 'Should be minimum of 4 characters';
  }
  //ajax call to know wether user is already registered or not
  var url = `http://localhost:5000/user/${su_email}`;
  fetch(url)
    .then(function(res) {
      if (res.status == 200) {
        // if user already registered with that email id
        error = 1;
        document.getElementById('emailerror').innerHTML = 'User already exists';
        return;
      } else if (res.status == 404) {
        // make ajax call to adduser with the data in text fields
        var url = `http://localhost:5000/adduser`;
        fetch(url, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              name: su_name,
              email: su_email,
              password: su_pwd,
              type: su_type
            })
          })
          .then(function(res) {
            console.log(res);
            //after successfull registration redirect to dashboard
            window.location = "http://localhost:5000/dashboard";
          })
          .catch(function(res) {
            console.log(res)
          });
      }
    })

  if (error) {
    return;
  }

}

// submitjob function send ajax request  to post a job

function submitjob() {
  event.preventDefault();
  //getting form values
  var jobtitle = document.getElementById('jobtitle').value.trim();
  var company = document.getElementById('company').value.trim();
  var des = document.getElementById('des').value.trim();
  let error = 0;
  //Basic length validation
  if (jobtitle.length <= 2) {
    error = 1;
    document.getElementById('joberror').innerHTML = 'Should be minimum of 3 characters';
  }
  if (company.length < 3) {
    error = 1;
    document.getElementById('companyerror').innerHTML = 'Should be minimum of 3 characters';
  }
  if (des.length < 20) {
    error = 1;
    document.getElementById('deserror').innerHTML = 'Should be minimum of 20 characters';
  }
  if (error) {
    return;
  }
  //ajax call to post job with data in textfields
  var url = `http://localhost:5000/dashboard/addjob`;
  fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        jobtitle: jobtitle,
        company: company,
        des: des
      })
    })
    .then(function(res) {
      console.log(res);
      window.location = "http://localhost:5000/dashboard";
    })
    .catch(function(res) {
      console.log(res)
    })
}

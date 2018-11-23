var mysql      = require('mysql');
//mysql connection
var connection = mysql.createConnection({
  host: 'localhost',
  user :'root',
  password: '',
  database:'Jobhunt'
});
connection.connect((err)=>{
  if(err)
  throw err;
  console.log("Mysql Connected");
});
module.exports = connection;

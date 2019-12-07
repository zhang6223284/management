const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'jwb',
});

connection.query('SELECT * from jwb.student where id = 1', (err, results, fields) => {
  if(err) throw err;
  console.log('结果', results[0]);
});

module.exports = connection;

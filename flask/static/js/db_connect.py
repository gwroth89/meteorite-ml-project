let RDS_HOSTNAME = 'postgresql://meteorite-ml-db.cl3jquwwq7kn.us-east-1.rds.amazonaws.com:5432/meteorite_ml_db';
let RDS_USERNAME = 'postgres';
let RDS_PASSWORD = 'project4team5';
let RDS_PORT = '5432';

data = require('node-postgres');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

// connection.end();
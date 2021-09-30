# express-mysql-CRUD

Connect with MySQL

  Node MySQL Connection

    const mysql = require('mysql');

    const connection = mysql.createConnection({

      host: 'localhost',

      user: 'user',

      password: 'password',

      database: 'databasename'

    });


    connection.connect((err) => {

    if (err) throw err;

    console.log('Connected to MySQL Server!');

    });


# What is Connection Pooling?

In a nutshell, the Connection pool is similar to a cache where we store frequently accessed data. Here the data is a database connection. The goal is to achieve the reusability of the database connections instead of creating a new connection every time there is a demand for the data.

Node MySQL Connection Pool Example

    const mysql = require('mysql');

    const pool = mysql.createPool({

    connectionLimit : 100, //important

    host     : 'localhost',

    user     : 'yourmysqlusername',

    password : 'yourmysqlpasword',

    database : 'yourdbname',

    debug    :  false

    });

    pool.query("SELECT * FROM TABLE_NAME",(err, data) => {

    if(err) {

    console.error(err);
            return;
        }

    // rows fetch

    console.log(data);

    });

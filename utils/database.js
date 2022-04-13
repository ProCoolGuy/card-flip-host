const mysql = require('mysql');

function initDatabase() {
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });
  connection.connect();

  connection.query('CREATE DATABASE gamehistory;', function (err, result) {
    if (err) {
      if (err.code !== 'ER_DB_CREATE_EXISTS') throw err;
      else console.log('Database already exist');
    } else console.log('Database created');
    console.log('Database Success!!!!');
  });

  connection.query('USE `gamehistory`;', function (err, result) {
    if (err) {
      throw err;
    } else console.log('Use database');
  });

  let query =
    'CREATE TABLE `card`( `no` INT(11) NOT NULL AUTO_INCREMENT, `player` CHAR(128), `txn` CHAR(128), `amount` FLOAT, `payout` FLOAT, `choice` CHAR(8), `result` CHAR(8), PRIMARY KEY (`no`) )';
  connection.query(query, function (err, result) {
    if (err) {
      if (err.code !== 'ER_TABLE_EXISTS_ERROR') throw err;
      else console.log('Table already exist');
    } else console.log('Table Created');
    console.log('Table Success!!!!');
  });

  connection.end();
}

module.exports = { initDatabase };

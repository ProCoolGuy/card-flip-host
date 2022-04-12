var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const database = require('../utils/database');
/* GET home page. */
router.get('/', function (req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamehistory',
  });
  connection.connect();
  connection.query(
    'SELECT * FROM card ORDER BY no DESC Limit 100',
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  connection.end();
});

router.put('/', function (req, res, next) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamehistory',
  });
  req = req.body.req;
  connection.connect();
  connection.query(
    `INSERT INTO card (player, txn, amount, choice, result, payout)  VALUES ('${req.player}', '${req.txn}',${req.amount},'${req.choice}','${req.result}',${req.payout})`,
    (err, result, fields) => {
      if (err) throw err;
    }
  );
  connection.query(
    'SELECT * FROM card ORDER BY no DESC Limit 100',
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
  connection.end();
});

module.exports = router;

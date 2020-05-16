const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transaction',
});

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function transaction() {
  try {
    await connect();
    await execQuery('SET autocommit = 0');
    await execQuery('START TRANSACTION');
    await execQuery(
      `UPDATE account SET balance = balance - 100 WHERE account_number = '100101'`,
    );
    await execQuery(
      `UPDATE account SET balance = balance + 100 WHERE account_number = '100102'`,
    );
    await execQuery(`INSERT INTO account_changes SET ?`, {
      account_number: '100101',
      amount: -100,
      changed_date: '2020-05-05',
      remark: 'Medical Expences',
    });
    await execQuery(`INSERT INTO account_changes SET ?`, {
      account_number: '100102',
      amount: 100,
      changed_date: '2020-05-05',
      remark: 'debt payment',
    });
    await execQuery('COMMIT');

    connection.end();
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
    connection.end();
  }
}

transaction();
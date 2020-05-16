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

async function seedDatabase() {

  const tables = {
      account: [
          { account_number: '100101', balance: 3000.0 },
          { account_number: '100102', balance: 5000.0 },
      ],

      account_changes: [
          {
              account_number: '100101',
              amount: 100,
              changed_date: '2020-05-05',
              remark: 'testing1',
          },
          {
              account_number: '100102',
              amount: -100,
              changed_date: '2020-05-05',
              remark: 'testing2',
          },
      ],  
  };
  
  try {

      await connect();

      await Promise.all(
         Object.keys(tables).map(entity => {
            tables[entity].map(async item => {
                await execQuery(`INSERT INTO ${entity} SET ?`, item);
            });
         }),
      );

    connection.end();

  } catch(error) {
      console.log(error);
      connection.end();
  }
}

seedDatabase();
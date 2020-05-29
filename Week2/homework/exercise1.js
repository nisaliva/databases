
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	const dropDatabase = `DROP DATABASE IF EXISTS userdb`;
	const createDatabase = `CREATE DATABASE IF NOT EXISTS userdb`;
	const useDatabase= `USE userdb`;

	const createAuthorsTable = `
	CREATE TABLE IF NOT EXISTS Authors
	(author_no INT PRIMARY KEY,
	 author_name VARCHAR(50),
	 university VARCHAR(100), 
	 date_of_birth DATE,
	 h_index INT,
	 gender ENUM("f", "m") )`;

	const addColumn = `ALTER TABLE Authors ADD COLUMN Collabrator INT `;

	const addForeignKey= `ALTER TABLE Authors ADD CONSTRAINT fk_Collabrator FOREIGN KEY (Collabrator) 
	REFERENCES Authors (author_no) `;
	
    connection.connect();

	try {
		await execQuery(dropDatabase);
		await execQuery(createDatabase);
		await execQuery(useDatabase);
		await execQuery(createAuthorsTable);
		await execQuery(addColumn);
		await execQuery(addForeignKey);
    
	} catch (error) {
    console.error(error);
    connection.end();
	}
	connection.end();
}

seedDatabase();
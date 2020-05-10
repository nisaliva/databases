
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'userdb'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	
	const createAuthorsTable = `
	CREATE TABLE IF NOT EXISTS Authors
	(author_no INT NOT NULL PRIMARY KEY, 
	 author_name VARCHAR(50),
	 university VARCHAR(100), 
	 date_of_birth DATE,
	 h_index INT,
	 gender ENUM("f", "m") )`;

	const addColumn = `ALTER TABLE Authors ADD Collabrator INT `;

	const addForeignKey= `ALTER TABLE Authors ADD CONSTRAINT fk_Authors FOREIGN KEY (Collabrator) 
	REFERENCES Authors (author_no) `;
	
    connection.connect();

	try {
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
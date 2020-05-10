const mysql = require('mysql'); 
const util = require('util');

const authors = require('./authors');
const researchPapers = require('./researchPapers');
const authorWithPaper = require('./authorWithPaper');
const collabratorColumn = require('./collabrator');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'userdb'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	const createResearchPaperTable = `
    CREATE TABLE IF NOT EXISTS Research_Papers
	(paper_id INT NOT NULL PRIMARY KEY, 
	paper_title VARCHAR(50),
	conference VARCHAR(50), 
	publish_date DATE )`;

	const RelationTable = `
	CREATE TABLE IF NOT EXISTS AuthorWithPaper
	(author_id int, paper_id int,
	CONSTRAINT FK_Author FOREIGN KEY(author_id) REFERENCES Authors(author_no),
	CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id),
	CONSTRAINT PK_AuthorWithPaper PRIMARY KEY(author_id, paper_id) )`;

	connection.connect();

	try {

		await execQuery(createResearchPaperTable);
		await execQuery(RelationTable);
		
		authors.forEach(async (author) => {
			await execQuery('INSERT INTO Authors SET ?', author);
        });
    
		researchPapers.forEach(async (paper) => {
			await execQuery('INSERT INTO Research_Papers SET ?', paper);
		});

		authorWithPaper.forEach(async (data) => {
			await execQuery('INSERT INTO AuthorWithPaper SET ?', data);
		});

        await Promise.all(
			collabratorColumn.map((item, index) => {
			  execQuery(`UPDATE Authors SET collabrator = ${item} WHERE author_no = ${++index}`);
			}),
		);

	} catch (error) {
        console.error(error)
        connection.end();
	}

	connection.end();
}
seedDatabase();
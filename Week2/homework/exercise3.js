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
	const authorNamesAndCollabrators = `SELECT a.author_name
    AS author_name,
    b.author_name AS collabrator_name
    FROM Authors a
    LEFT JOIN Authors b 
	ON a.collabrator = b.author_no`;
	
    const authorsAndResearchPapersTitle = `SELECT a.author_name,
	rp.paper_title 
	FROM Authors a 
	LEFT JOIN AuthorWithPaper p 
	ON (a.author_no = p.author_id)
	LEFT JOIN Research_Papers rp 
	ON (p.paper_id = rp.paper_id)`;

	connection.connect();

	try {
		console.log(await execQuery(authorNamesAndCollabrators));
		console.log(await execQuery(authorsAndResearchPapersTitle));
	} catch (error) {
		console.error(error);
		connection.end();
	}
	connection.end();
}

seedDatabase();
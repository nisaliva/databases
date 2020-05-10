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
	const query1 = `SELECT rp.paper_title,
	COUNT(DISTINCT a.author_no) 
	AS 'Authors'
	FROM Authors a RIGHT JOIN AuthorWithPaper p 
	ON (a.author_no = p.author_id)
	RIGHT JOIN Research_Papers rp 
	ON (p.paper_id = rp.paper_id) 
	GROUP BY rp.paper_title`;

	const query2 = `SELECT COUNT(DISTINCT rp.paper_title)
	AS 'Sum of the published papers written by female'
	FROM Authors a 
	RIGHT JOIN AuthorWithPaper p
	ON (a.author_no = p.author_id)
	RIGHT JOIN Research_Papers rp
	ON (p.paper_id = rp.paper_id) 
	where a.gender="f"`;

	const query3 = `SELECT AVG(a.h_index)
	AS 'average of h-index', a.university 
	FROM Authors a
	GROUP BY a.university`;

	const query4 = `SELECT a.university ,
	COUNT(DISTINCT rp.paper_title) 
	AS 'Sum of the Research Papers'
	FROM Authors a 
	LEFT JOIN AuthorWithPaper p
	ON (a.author_no = p.author_id)
	LEFT JOIN Research_Papers rp
	ON (p.paper_id = rp.paper_id) 
	GROUP BY a.university`;

	const query5 = `SELECT MIN(a.h_index)
	AS 'h-index (MIN)',
	MAX(a.h_index) AS 'h-index (MAX)', a.university
	FROM Authors a
	GROUP BY a.university;`;
	
	connection.connect();
	
	try {
		console.log(await execQuery(query1));
		console.log(await execQuery(query2));
		console.log(await execQuery(query3));
		console.log(await execQuery(query4));
		console.log(await execQuery(query5));

		connection.end();
	} catch (error) {
		console.error(error);
		connection.end();
	}
}

seedDatabase();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

const querries = {
    populationGreaterThan8M: "SELECT name, population FROM country WHERE population > 8000000;",
    namesOfCountriesHaveLand: "SELECT name FROM country WHERE name LIKE '%land%';",
    namesOfCitiesPopulation: "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;",
    countriesInEurope: "SELECT name FROM country WHERE continent = 'Europe';",
    countriesDescOrderedBySurfaceArea: "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;",
    citiesInNetherlands: "SELECT name, countryCode FROM city WHERE CountryCode = 'NLD' ",
    populationOfRoterdam: "SELECT name, population FROM city WHERE name = 'Rotterdam';",
    top10LargestCountry: "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    top10PopulatedCountry: "SELECT name, population FROM city ORDER BY population DESC LIMIT 10;",
    populationOfWorld: "SELECT SUM(population)  AS 'Population of the World' FROM country;"
};

for (let i in querries) {
    connection.query(querries[i], (error, result, fields)  => {
        if (error) throw error;
        console.log(`${i}`, result);
    }
)};

connection.end();

const { MongoClient } = require('mongodb');

async function main() {

    const uri = 'mongodb://127.0.0.1:27017/'

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        await createNewCity(client,
            { 
              name: "Bursa", 
              countryCode: "TUR", 
              district: "Bursa", 
              population: 2500000
            }
        );

        await findOneCityByName(client, "Bursa");
   
        await updateCityByName(client, "Bursa", { population: 3000000 });
    
        await findOneCityByCountryCode(client, "TUR");
  
        await deleteCityByName(client, "Bursa")


    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// Create a new record (document) for a new city 
async function createNewCity(client, newCity) {
    const result = await client
        .db("world")
        .collection("city")
        .insertOne(newCity);
    console.log(`New city created with the following id:${result.insertedId}`);
}

// Update that record with a new population
async function updateCityByName(client, cityName, updatedListing) {
    const result = await client
        .db("world")
        .collection("city")
        .updateOne(
            { name: cityName },
            { $set: updatedListing }
        );

    console.log(`${result.matchedCount}`);
}

// finding by the city name
async function findOneCityByName(client, cityName) {
    const result = await client
        .db("world")
        .collection("city")
        .findOne({ name: cityName });
    if (result) {
        console.log(`${cityName} is found`);
        console.log(result);
    } else {
        console.error(`No city found with '${cityName}'`);
    }
}

// finding by the country code
async function findOneCityByCountryCode(client, codeOfCountry) {
    const result = await client
        .db("world")
        .collection("city")
        .findOne({ countryCode: codeOfCountry });
    if (result) {
        console.log(
            `${codeOfCountry} is found`
        );
        console.log(result);
    } else {
        console.error(`No countryCode found with ${codeOfCountry}`);
    }
}

// Delete the city
async function deleteCityByName(client, cityName) {
    const result = await client
        .db("world")
        .collection("city")
        .deleteOne({ name: cityName });

    console.log(`${result.deletedCount}`)
};

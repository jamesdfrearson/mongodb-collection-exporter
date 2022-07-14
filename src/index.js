/**
 * MongoDB Collection Exporter
 * A simple Node.js script used to export data from MongoDB collections in a JSON format.
 *
 * © 2022 James Frearson
 */

// Import required modules.
require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const { formatDateTime, makeFile } = require('./helpers');

// Extract environment variables.
// eslint-disable-next-line no-undef
const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

// Check that all the required environment variables have been set.
if (!(DATABASE_HOST && DATABASE_PORT && DATABASE_NAME)) {
  console.warn(
    `✖ Please ensure you have set the required fields in the '.env' file. Please see the 'README.md' document and the 'sample.env' provided.`,
  );

  return;
}

try {
  MongoClient.connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, async function (err, client) {
    if (err) throw err;

    const db = client.db(DATABASE_NAME);

    console.log('✔ Successfully connected to database.');

    const collections = await db.listCollections({ type: 'collection' }, { nameOnly: true }).toArray();
    const collectionsLength = collections.length;

    if (collectionsLength === 0) {
      console.log('✖ No collections found to export.');

      // eslint-disable-next-line no-undef
      return process.exit(1);
    }

    // Sort the collections alphabetically.
    collections.sort((a, b) => (a.name > b.name ? 1 : -1));

    console.log(`✔ Successfully found ${collectionsLength} collections.`);

    // Create the folder to store the exported JSON files in.
    const backupPath = `./backup/${formatDateTime(Date.now())}/`;

    // Create the path.
    fs.mkdirSync(backupPath, { recursive: true });

    for (let i = 0; collectionsLength !== i; i++) {
      const collection = collections[i];

      let startTime = 0;

      console.log(`Fetching data from collection '${collection.name}'.`);

      startTime = Date.now();

      const items = await db.collection(collection.name).find({}).toArray();

      const fileName = `${backupPath}${collection.name}.json`;

      console.log(`✔ Fetched data from collection '${collection.name}'. Took ${Date.now() - startTime}ms`);

      console.log(`Exporting data to JSON file - ${fileName}`);

      startTime = Date.now();

      await makeFile(fileName, items);

      console.log(`✔ Successfully exported collection '${collection.name}'. Took ${Date.now() - startTime}ms`);
    }
  });
} catch (e) {
  console.warn(`✖ Unable to connect to database - 'mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}'.`);

  // eslint-disable-next-line no-undef
  return process.exit(1);
}

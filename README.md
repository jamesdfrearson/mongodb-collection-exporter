# MongoDB Collection Exporter

This is a simple Node.js script used to export data from collections to a backup folder in a JSON format.

## Setup

First, run `npm i` to install all the necessary Node modules.

Clone the contents from `sample.env` into a `.env` file and enter the relevant data into it:

| Key           | Example Value |
| ------------- | ------------- |
| DATABASE_HOST | 127.0.0.1     |
| DATABASE_PORT | 27017         |
| DATABASE_NAME | mydb          |

Run `npm start` and allow the backup process to complete.

## Handling large amounts of data

You may need to increase the memory limit for this application to run if you're handling large amounts of data. To do this, modify the `start` script in the `package.json` file (line 7) and change the value from `8192` to your desired value - please keep in mind this value is in megabytes.

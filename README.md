# MongoDB Collection Exporter

This is a simple Node.js script used to export data from collections to a backup folder in a JSON format.

## Setup

First, run `npm i` to install all the necessary Node modules.

Clone the contents into a `.env` file and enter the relevant data into it:

| Key           | Example Value |
| ------------- | ------------- |
| DATABASE_HOST | 127.0.0.1     |
| DATABASE_PORT | 27017         |
| DATABASE_NAME | mydb          |

Run `npm start` and allow the backup process to complete.

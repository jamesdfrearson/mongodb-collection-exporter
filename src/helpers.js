/**
 * MongoDB Collection Exporter
 * A simple Node.js script used to export data from MongoDB collections in a JSON format.
 *
 * © 2022 James Frearson
 */

const fs = require('fs');
const json = require('big-json');

function _escapeRegExp(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function _replaceAll(str, match, replacement) {
  return str.replace(new RegExp(_escapeRegExp(match), 'g'), () => replacement);
}

function formatDateTime(dateTime) {
  return _replaceAll(_replaceAll(_replaceAll(new Date(dateTime).toLocaleString(), '/', '-'), ', ', '--'), ':', '-');
}

async function makeFile(filename, pojo) {
  return new Promise(function (resolve, reject) {
    const stringifyStream = json.createStringifyStream({
      body: pojo,
    });

    stringifyStream.on('data', function (strChunk) {
      fs.appendFileSync(filename, strChunk, function (err) {
        if (err) {
          reject();
          throw err;
        }
      });
    });

    stringifyStream.on('end', function (e) {
      console.log(`Finished writing ${filename}`);
      resolve();
    });
  });
}

module.exports = {
  formatDateTime,
  makeFile,
};

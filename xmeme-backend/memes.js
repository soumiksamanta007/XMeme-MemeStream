const sqlite3 = require('sqlite3');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const db = new sqlite3.Database('./db/memes.db');

async function getMemes() {
    const sql = "SELECT id, name, url, caption FROM memes ORDER BY dop DESC LIMIT 100";
    return new Promise(function (resolve, reject) {
        db.all(sql, [], (err, rows) => {
            if (err) 
                reject(err);
            resolve(rows);
        });
    })
    .then(function(res) {
        return res;
    })
    .catch(err => {
        const ErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the ErrorList list to http status code
        err.status = ErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}

async function postMeme(entry) {
    var id = uuidv4();
    console.log(entry);
    const sql = `INSERT INTO memes (id, dop, name, caption, url) VALUES ( '${id}', datetime('now'), '${entry['name']}', '${entry['caption']}', '${entry['url']}')`;
    return new Promise(function(resolve, reject) {
        db.all(sql, [],  (err, rows) => {
            if (err)
                reject (err);
            resolve({"id": (id).toString()});
        });
    })
    .then(function(res) {
        return res;
    })
    .catch(err => {
        const ErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the ErrorList list to http status code
        err.status = ErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}


async function getMeme(entryID) {
    const sql = `SELECT id, name, url, caption FROM memes WHERE id = '${entryID}'`;
    return new Promise(function(resolve, reject) {
        db.all(sql, [],  (err, rows) => {
            if (err) 
                reject (err);
            resolve(result.length > 0 ? result[0] : {});
        });
    })
    .then(function(res) {
        return res;
    })
    .catch(err => {
        const ErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the ErrorList list to http status code
        err.status = ErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}


async function patchMeme(entryID, newUrl, newCaption) {
    const sql = `UPDATE memes SET url = '${newUrl}', caption = '${newCaption}' WHERE id = UUID_TO_BIN('${entryID}')`;
    return new Promise(function(resolve, reject) {
        db.all(sql, [],  (err, rows) => {
            if (err)
                reject (err); 
            resolve(result); // success
        });            
    })
    .then(function(res) {
        return res;
    })
    .catch(err => {
        const ErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the ErrorList list to http status code
        err.status = ErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}

const HttpStatusCodes = Object.freeze({
    SQLITE_CONSTRAINT: 409,
});

module.exports = {
    getMeme,
    getMemes,
    postMeme,
    patchMeme,
}

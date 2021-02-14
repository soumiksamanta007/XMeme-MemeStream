const mysql = require('mysql2');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

async function getMemes() {
    const sql = "SELECT BIN_TO_UUID(id) AS id, name, url, caption FROM memes ORDER BY dop DESC LIMIT 100";
    return new Promise(function (resolve, reject) {
        db.connect(function(err) {
            if (err) 
                reject(err);
            db.query(sql, function (err, result, fields) {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    })
    .catch(err => {
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the mysqlErrorList list to http status code
        err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}


async function postMeme(entry) {
    var id = uuidv4();
    const sql = `INSERT INTO memes (id, dop, name, caption, url) VALUES ( UUID_TO_BIN('${id}'), NOW(), '${entry['name']}', '${entry['caption']}', '${entry['url']}')`;
    return new Promise(function(resolve, reject) {
        db.connect(function(err) {
            if (err)
                reject (err);            
            db.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve({"id": (id).toString()});
            });
        });
    })
    .catch(err => {
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the mysqlErrorList list to http status code
        err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}


async function getMeme(entryID) {
    const sql = `SELECT BIN_TO_UUID(id) AS id, name, url, caption FROM memes WHERE id = UUID_TO_BIN('${entryID}')`;
    return new Promise(function(resolve, reject) {
        db.connect(function(err) {
            if (err) 
                reject (err);
            db.query(sql, function (err, result, fields) {
                if (err)
                    reject (err);
                resolve(result.length > 0 ? result[0] : {});
            });
        });
    })
    .catch(err => {
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the mysqlErrorList list to http status code
        err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}

async function patchMeme(entryID, newUrl, newCaption) {
    const sql = `UPDATE memes SET url = '${newUrl}', caption = '${newCaption}' WHERE id = UUID_TO_BIN('${entryID}')`;
    return new Promise(function(resolve, reject) {
        db.connect(function(err) {
        if (err)
            reject (err);            
            db.query(sql, function (err, result, fields) {
                if (err)  
                    reject (err); // failure due to db error
                resolve(result); // success
            });
        });            
    })    
    .catch(err => {
        const mysqlErrorList = Object.keys(HttpStatusCodes);
        // convert mysql errors which are in the mysqlErrorList list to http status code
        err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
        return err;
    });
}

const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409,
});

module.exports = {
    getMeme,
    getMemes,
    postMeme,
    patchMeme,
}
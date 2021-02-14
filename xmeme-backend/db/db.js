const sqlite3 = require('sqlite3');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const memeDB = new sqlite3.Database(process.env.DB_PATH, 
                                    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
                                    (err) => { 
    if(err) 
        console.log(err);
    else
        console.log(`Connected to the ${process.env.DB_PATH} database.`);
});

dbSchema = `
    CREATE TABLE IF NOT EXISTS memes
    ( 
       id         VARCHAR(500) PRIMARY KEY,
       dop        DATETIME NOT NULL,
       name       VARCHAR(100) UNIQUE NOT NULL, 
       caption    VARCHAR(200) UNIQUE NOT NULL, 
       url        VARCHAR(500) UNIQUE NOT NULL
    );`

memeDB.exec(dbSchema, function(err){
    if (err) {
        console.log(err)
    }
    else {
        console.log("Created Schema successfully!")
    }
});
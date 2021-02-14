const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const validator = require('validator');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const memes = require('./memes');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { request } = require('express');


const app = express();

dotenv.config();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const PORT = Number(process.env.PORT || 8080);

/**
 * @swagger
 *      components:
 *          schemas:
 *              Meme:
 *                  type: object
 *                  required:
 *                      - name
 *                      - caption
 *                      - url
 *                  properties:
 *                      id:
 *                          type: string
 *                          description: The auto-generated id of the meme.
 *                      name:
 *                          type: string
 *                          description: The full name of the author of the meme.
 *                      caption:
 *                          type: string
 *                          description: The caption given to the meme
 *                      url:
 *                          type: string
 *                          description: The URL of the meme
 *          
 *                  example:
 *                      id: 70cc1306-fb78-4e14-89e2-2d3171cfb95d
 *                      name: Soumik Samanta
 *                      caption: This is a meme!
 *                      url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 */
/**
 * @swagger
 *      tags:
 *          name: Memes
 *          description: API to manage memes
 */

const swagger_options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "XMeme - Meme Stream API",
            version: "1.0.0",
            description: "This is backend server/API for the XMeme - Meme Stream application made with Express and documented with Swagger",
            contact: {
                name: "Soumik Samanta",
                email: "soumiksamantaa@gamil.com",
            },
            servers: [{
                "url":`http://localhost:${PORT}`
            }],
        }
    },
    apis: ["index.js"]
};
const specs = swaggerJsDoc(swagger_options);
app.use(
    "/swagger-ui",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

/**
 * @swagger
 * /memes:
 *  get:
 *      summary: Lists all memes
 *      tags: [Memes]
 *      responses:
 *          "200":
 *              description: The list of memes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Meme'
 *                          example:
 *                              - id: 70cc1306-fb78-4e14-89e2-2d3171cfb95d
 *                                name: Ankit Jaiswal
 *                                caption: Another meme!
 *                                url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 *                              - id: 70cc1306-fb78-4e14-89e2-2d3171cfb95d
 *                                name: Akash Manna
 *                                caption: Yet another meme!
 *                                url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 *                              - id: 70cc1306-fb78-4e14-89e2-2d3171cfb95d
 *                                name: Soumik Samanta
 *                                caption: This is a meme!
 *                                url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 *          "500":
 *              description: Internal Server Error
 */

app.get('/memes', async (_, res) => {
    result = await memes.getMemes();
    if('errno' in result)
        if(result['status'])
            res.status(result.status).send(result);
        else
            res.status(500).send(result);
    else
        res.status(200).send(result);
});

/**
 * @swagger
 * /memes:
 *  post:
 *      summary: Creates a new meme entry
 *      tags: [Memes]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The full name of the author of the meme.
 *                          caption:
 *                              type: string
 *                              description: The caption given to the meme
 *                          url:
 *                              type: string
 *                              description: The URL of the meme
 *                      example:
 *                          name: Soumik Samanta
 *                          caption: This is a meme!
 *                          url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 *      responses:
 *          "201":
 *              description: Success. Returns the id of the created meme.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  description: The id of the newly created entry
 *                          example:
 *                              id: 70cc1306-fb78-4e14-89e2-2d3171cfb95d
 *          "409":
 *              description: Failure. Duplicate Entry.
 *          "422":
 *              description: Incorrect Value of Input
 *          "500":
 *              description: Internal Server Error
 */
app.post('/memes', async (req, res, next) => {
    console.log('New Data received: ', req.body);
    var result = await memes.postMeme(req.body);
    if('errno' in result)
        if(result['status'])
            res.status(result.status).send(result);
        else
            res.status(500).send(result);
    else {
        res.status(201).send(result);
        console.log('Stored successfully!');
    }
});


/**
 * @swagger
 * /memes/{id}:
 *  get:
 *      summary: Gets a meme by id
 *      tags: [Memes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The id of the requested meme.
 *      responses:
 *          "200":
 *              description: Success. Returns the requested meme.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Meme'
 *          "404":
 *              description: Meme not found
 *          "500":
 *              description: Internal Server Error
 */
app.get('/memes/:id', async (req, res, next) => {
    if (validator.isUUID(req.params.id)) {
        result = await memes.getMeme(req.params.id);
        
        if('errno' in result)
            if(result['status'])
                res.status(result.status).send(result);
            else
                res.status(500).send(result);
        else {        
            if(result && Object.keys(result).length === 0)  // meme with given id not found
                res.sendStatus(404);
            else
                res.status(200).send(result);
        }
    }
    else{
        const err = new HttpException(404, 'Endpoint Not Found');
        next(err);
    }
});


/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *      summary: Updates a meme entry
 *      tags: [Memes]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The id of the requested meme.        
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          caption:
 *                              type: string
 *                              description: The caption given to the meme
 *                          url:
 *                              type: string
 *                              description: The URL of the meme
 *                      example:
 *                          caption: A new caption!
 *                          url: https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg
 *      responses:
 *          "204":
 *              description: Success. Meme Updated.
 *          "404":
 *              description: Meme not found
 *          "409":
 *              description: Failure. Duplicate Entry.
 *          "422":
 *              description: Incorrect Value of Input
 *          "500":
 *              description: Internal Server Error
 */
app.patch('/memes/:id', async (req, res, next) => {
    console.log('Modified data received: ', req.body);
    if (validator.isUUID(req.params.id)) {
        var result = await memes.patchMeme(req.params.id, req.body["url"], req.body["caption"]);
        if('errno' in result)
            if(result['status'])
                res.status(result.status).send(result);
            else
                res.status(500).send(result);
        else {
            if(result.affectedRows === 0){
                const err = new HttpException(404, 'Endpoint Not Found');
                next(err);
            }
            else {
                res.sendStatus(204);
                console.log('Updated successfully!');
            }
        }
    }
    else {      // failure as meme ID does not belong to UUID
        const err = new HttpException(404, 'Endpoint Not Found');
        next(err);
    }    
});


// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

// Error middleware
app.use(errorMiddleware);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 xmeme-meme-stream backend running on ${PORT} ...`);
})


/*USAGE*/
// curl --location --request POST 'http://127.0.0.1:8081/memes' \
// --header 'Content-Type: application/json' \
// --data-raw '{
// "name": "ashok kumar",
// "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
// "caption": "This is a meme"
// }'

// curl --location --request PATCH 'http://127.0.0.1:8081/memes/70cc1306-fb78-4e14-89e2-2d3171cfb95d' \
// --header 'Content-Type: application/json' \
// --data-raw '{
// "url": "https://cdn.memes.com/up/70299851545116409/i/1612499230845.jpg",
// "caption": "new_caption"
// }'
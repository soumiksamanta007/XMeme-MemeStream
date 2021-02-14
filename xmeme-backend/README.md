# XMeme - Meme Stream Backend built with Node JS and Express (doccumented with Swagger)


## Prerequisites
```
nodejs version >= 12
```

## Local Run

```bash
npm install && npm start
```

The server may be accessed at http://localhost:8081/

Available Endpoints and their Methods:

* /memes
    - GET: Lists all the memes
    - POST: Create a new meme

* /memes/{id}
    - GET: Gets the meme with requested ID
    - PATCH: Updates a meme with the given ID

For more details please visit Swagger Doccumentation at http://localhost:8081/swagger-ui/


## Deployment

After signing up on Heroku, create a new app, and proceed to download Heroku CLI

```bash
heroku login -i
heroku builds:create -a <name_of_your_app>
```
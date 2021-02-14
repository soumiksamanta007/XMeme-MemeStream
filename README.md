# XMeme - Meme Stream


## Overview
    1. Users can post Memes by providing these inputs
        ◦ Name of the person posting the meme
        ◦ Caption for the Meme
        ◦ URL of the Meme image

    2. Users can view the latest 100 memes posted.
        ◦ If they post a new meme, that gets listed.
        ◦ Each meme displays the name of the meme maker, the caption for the meme and the image pulled from the meme URL.

    3. Users can update any meme by providing these inputs.
        ◦ New Caption for the Meme
        ◦ New URL of the Meme image

## Frontend

    Tech Stack used: 

        ◦ HTML, CSS, JS

        ◦ Netlify for Deployment


    1. The Frontend has a form at the top which can be used by users to post memes with these fields - Name of the meme creator, Caption for the meme and URL of the meme image. It shall send these inputs to the backend. The inputs are verified before being sent to the backend.

    2. The Frontend lists the latest 100 memes posted. It fetches these details from the backend.
        ◦ Each meme lists these three fields one below the other - Name of the meme creator, the caption for the meme, the image fetched from the meme URL.
        ◦ The users can also edit each meme by providing new inputs for caption and URL. Again the inputs are verified.
        ◦ Display memes in the reverse chronological order i.e. last created one first.

    3. The Frontend has a form at the top which can be used by users to post memes with these fields - Name of the meme creator, Caption for the meme and URL of the meme image. It shall send these inputs to the backend.


## Backend

    Tech Stack used: 

        ◦ Node JS with Express for creating REST API

        ◦ MySQL for database storage

        ◦ Swagger UI for Doccumentation

        ◦ Heroku for Deployment


    The backend serves using a REST API.

        1. The backend is capable of receiving the posted meme inputs from the frontend and store them in a database.
           The database shall be designed to store and retrieve the meme content.

        2. The backend is capable of fetching the list of memes from the database and send them to the frontend.

        3. The interaction between the frontend and backend is based on a REST API with support for 4 endpoints as described in REST API Structure.



#### Both the Frontend and Backend are deployed publicly.

    - Frontend deployed at: https://xmeme-memestream.netlify.app

    - Backend deployed at: http://xmeme-memestream-app.herokuapp.com


## Structure of REST API
    1. Endpoint to send a meme to the backend

        ◦ HTTP Method - POST
        ◦ Endpoint - /memes
        ◦ Json Body contains these inputs - name, url, caption
        ◦ The backend should allocate a unique id for the meme and return it as a json response.
        ◦ Example request and sample response

            
            curl --location --request POST 'http://localhost:8081/memes' \
            --header 'Content-Type: application/json' \
            --data-raw '{
            "name": "ashok kumar",
            "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
            "caption": "This is a meme"
            }'

            {
            "id": "1"
            }

    2. Endpoint to fetch the latest 100 memes created from the backend

        ◦ HTTP Method - GET
        ◦ Endpoint - /memes
        ◦ Error:
            ▪ If there are no memes available, an empty array shall be returned. 
        ◦ Example request and response body

            curl --location --request GET 'http://localhost:8081/memes'

            [
                {
                "id": "1",
                "name": "MS Dhoni",
                "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
                "caption": "Meme for my place"
                },
                {
                "id": "2",
                "name": "Viral Kohli",
                "url": "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg",
                "caption": "Another home meme"
                }
            ]

    3. Endpoint to specify a particular id (identifying the meme) to fetch a single Meme.

        ◦ HTTP Method - GET
        ◦ Endpoint - /memes/<id>
        ◦ Error:
            ▪ If a meme with that Id doesn’t exist, a 404 HTTP response code is returned. 
        ◦ Example request and sample response

            curl --location --request GET 'http://localhost:8081/memes/1'

            {
            "id": "1",
            "name": "MS Dhoni",
            "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
            "caption": "Meme for my place"
            }
    
    4. Endpoint to update the caption or url for an existing meme at the backend

        ◦ It is capable of changing both caption/url or one of them in a single call
        ◦ Name of the meme creator is not be allowed to change
        ◦ Added an edit button next to the memes in the list where this can be triggered from
        ◦ Error:
            ▪ If a meme with that Id doesn’t exist, a 404 HTTP response code should be returned. 
        ◦ HTTP Method - PATCH
        ◦ Endpoint - /memes/<id>
        ◦ Json Body can contain these inputs - url, caption
        ◦ The response will be just the HTTP status code
        ◦ Example request

            curl --location --request PATCH 'http://<Server_URL>/memes/<id>' \
            --header 'Content-Type: application/json' \
            --data-raw '{
            "url": "new_url",
            "caption": "new_caption"
            }'

## Local Run

```bash
chmod +x install.sh
./install.sh
```

```bash
chmod +x server_run.sh
./server_run.sh
```

```bash
chmod +x sleep.sh
./sleep.sh
```

## Deployment

Please check deployment for frontend and backend in their respective sections
const URL = "https://xmeme-memestream-app.herokuapp.com/memes";
// const URL = "https://127.0.0.1:8081/memes";

var memes = [];
var editMemeID;

// creates a meme card
function createMemeCard(id, name, caption, url) {
    var memeCardContainer = document.createElement('div');
    memeCardContainer.setAttribute('class', 'memeCard');
    memeCardContainer.setAttribute('id', id);

        var nameandeditHeader = document.createElement('div');
        nameandeditHeader.setAttribute('class', 'memeAuthorNameandButton');
        nameandeditHeader.setAttribute('style', "margin: 10px 10px;");

            var nameHeader = document.createElement('h3');
            nameHeader.textContent = name;
            nameandeditHeader.appendChild(nameHeader);

            var editButton = document.createElement('input');
            editButton.type = 'button';
            editButton.className = 'editbutton';
            editButton.value = 'Edit Meme';
            editButton.onclick = () => {
                editMeme(editButton.parentNode.parentNode.id,
                        editButton.parentElement.firstChild.textContent);
            };
            nameandeditHeader.appendChild(editButton);

        memeCardContainer.appendChild(nameandeditHeader);

        var captionHeader = document.createElement('p');
        captionHeader.style="margin: 10px 10px;";
        captionHeader.textContent = caption;
        memeCardContainer.appendChild(captionHeader);

        var memeImage = document.createElement('img');
        memeImage.setAttribute('class', 'memeImage');
        memeImage.setAttribute('src', url);
        memeImage.setAttribute('alt', 'Meme Image');
        memeImage.onerror = () => {
            memeImage.setAttribute("src", "./assets/not_found.jpg");
        }
        memeCardContainer.appendChild(memeImage);

    document.getElementById('container').appendChild(memeCardContainer);
}

// loads all the meme cards on the page
function loadMemes() {
    for (i = 0; i < 100 && i < memes.length; i++)
        createMemeCard(memes[i].id, memes[i].name, memes[i].caption, memes[i].url);
}

//get the meme posts from the backend server
function getMemes() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            memes = JSON.parse(this.responseText);
            console.log(xhttp.status);
            loadMemes();
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
}

// check if the URL is valid
function isValidURL(str) {
    var a = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
}

// get the form inputs from the user, if valid post to backend server
function postMeme() {    
    var name = document.getElementById('full_name').value;
    var caption = document.getElementById('meme_caption').value;
    var memeUrl = document.getElementById('meme_url').value;

    // validate inputs
    if (name !== '' && caption !== '' && isValidURL(memeUrl)) {
        // post the meme entry to the backend database
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            console.log(this.status)
            if (this.readyState == 4 && this.status == 201) {
                console.log(this.responseText);
                console.log(xhttp.status);
                alert("Your Meme has been added! 😀");
            }
            else if(this.status === 0)
                alert("Caption or Meme already exists! 😐");
            else
                alert("Failed to add meme! 🙁");
        };
        xhttp.open("POST", URL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({"name": name,
                                "url": memeUrl,
                                "caption": caption}));
    }
}

// called when user clicks on "Edit Meme" button on meme card
function editMeme(entryID, name) {
    document.getElementById('full_name-patch').value = name;

    // sets the global variable for sending patch request
    editMemeID = entryID;

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// get the form inputs from the user, if valid send patch request to backend server with meme ID
function patchMeme() {
    var caption = document.getElementById('meme_caption-patch').value;
    var memeUrl = document.getElementById('meme_url-patch').value;

    // validate inputs
    if (caption !== '' && isValidURL(memeUrl)) {
        // update the meme in the backend database
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 204) {
                alert("Meme has been modified! 😊");
            }
            console.log(this.status);
        };
        xhttp.open("PATCH", URL+"/"+editMemeID, true);
        console.log(URL+"/"+editMemeID);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({"caption": caption,
                                    "url": memeUrl}));
        if(xhttp.status === 204)
            alert("Meme has been modified! 😊");
        else if(xhttp.status === 0)
            alert("Caption or Meme already exists! 😐");
        else
            alert("Failed to update meme! 🙁");
    }
}

window.onload = () => {
    getMemes(); 
}   


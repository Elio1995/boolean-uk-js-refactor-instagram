// Description
// In this exercise we explore a multi-user experience most commonly found on social media apps like Instagram, where users can see and interact with other users.

// In the template folder you will find examples of the HTML that you can use as a reference to build the exercise, the classes are connected to styles/index.css. Start at 1-root.html.

// Ignore the preview feature in the example, we've replaced that feature with an adding likes feature instead (this is not shown in any of the templates so you'll have to add the HTML and style it as you see fit).

// Deliverables
// - A user can select the user they want to post or comment as
// - From the create a post section, a user can:
//     - Enter a post's image URL
//     - Enter a post's title
//     - Enter a post's content
//     - Create a post and view it in the feed
// - From the feed section, a user can:
//     - View a post and the owner of the post
//     - View a posts' comments and the owner of the comments
//     - Add a comment to a post
//   - Add a like to a post


// Instructions
// - Download the .zip file from https://codesandbox.io/s/js-instagram-exercise-starter-template-6vfoj
// - Run your json-server with json-server --watch db/db.json --routes db/routes.json --static .; notice --static . this is an alternative to using Live Server, you'll be able to view your app on http://localhost:3000/
// - Create a fetch function to get data
// - Create render functions to show data
// - Use event listeners and fetch to create and update data on the server

// Tips
// - In this exercise focus on practicing Javascript and fetch requests, take your time.
// - Keep track of the currentUser in a global variable so that you have access to their id in all your functions.
// - Think about conditional rendering when creating the preview feature.



const rootSection = document.querySelector("#root")



let headerEl = document.createElement("header")
headerEl.setAttribute("class", "main-header")

let mainEl = document.createElement("main")
mainEl.setAttribute("class", "wrapper")

rootSection.append(headerEl, mainEl)




// USER SECTION

function createUserSection(users) {
    const divEl = document.createElement("div");
    divEl.setAttribute("class", "wrapper");

    for (user of users) {
        function createUser(user) {
            const chipEl = document.createElement("div");
            chipEl.setAttribute("class", "chip");

            const avatarSmallEl = document.createElement("div");
            avatarSmallEl.setAttribute("class", "avatar-small");

            const imgEl = document.createElement("img");
            imgEl.setAttribute("src", user.avatar);
            imgEl.setAttribute("alt", user.username);

            const nameEl = document.createElement("span");
            nameEl.innerText = user.username;

            avatarSmallEl.append(imgEl, nameEl);
            chipEl.append(avatarSmallEl);

            divEl.append(chipEl);
        }
        createUser(user);
    }

    headerEl.append(divEl);
}

let users = [];

fetch(`http://localhost:3000/users`)
    .then(function (response) {
        return response.json();
    })
    .then(function (userData) {
        users = userData;
        createUserSection(userData);
    });



// CREATE POST SECTION

//  <section class="create-post-section">
let createPostSection = document.createElement("section")
createPostSection.setAttribute("class", "create-post-section")
mainEl.append(createPostSection)


//   <form id="create-post-form" autocomplete="off">
let createPostForm = document.createElement("form")
createPostForm.setAttribute("id", "create-post-form")
createPostForm.setAttribute("autocomplete", "off")
createPostSection.append(createPostForm)

//     <h2>Create a post</h2>
let h2El = document.createElement("h2")
h2El.innerText = "Create a post"
createPostForm.append(h2El)

//     <label for="image">Image</label>
let labelImage = document.createElement("label")
labelImage.setAttribute("for", "image")
labelImage.innerText = "Image"
createPostForm.append(labelImage)

//     <input id="image" name="image" type="text" />
let inputeImage = document.createElement("input")
inputeImage.setAttribute("id", "image")
inputeImage.setAttribute("name", "image")
inputeImage.setAttribute("type", "text")
createPostForm.append(inputeImage)

//     <label for="title">Title</label>
let labelTitle = document.createElement("label")
labelTitle.setAttribute("for", "title")
labelTitle.innerText = "Title"
createPostForm.append(labelTitle)
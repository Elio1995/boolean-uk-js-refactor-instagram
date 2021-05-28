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

// STATE

let state = {
    users: [],
    posts: [],
    currentUser: "Van Gogh",
};


// ROOT
const rootEl = document.querySelector("#root");

// HEADER SECTION
function headerSection() {

    const headerEl = document.createElement("header")
    headerEl.setAttribute("class", "main-header")

    const divWrapperEl = document.createElement("div");
    divWrapperEl.setAttribute("class", "wrapper");

    for (userData of state.users) {
        const chipEl = createUserSection(userData);
        divWrapperEl.append(chipEl);
    }
    headerEl.append(divWrapperEl);
    rootEl.append(headerEl);
}

// USER PROFILE
function createUserSection(user) {
    const chipEl = document.createElement("div");
    chipEl.setAttribute("class", "chip");
    if (state.currentUser === user.username) {
        chipEl.classList.add("active");
    }

    const avatarSmallEl = document.createElement("div");
    avatarSmallEl.setAttribute("class", "avatar-small");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", user.avatar);
    imgEl.setAttribute("alt", user.username);

    const nameEl = document.createElement("span");
    nameEl.innerText = user.username;

    avatarSmallEl.append(imgEl);
    chipEl.append(avatarSmallEl, nameEl);

    return chipEl
}

// MAIN SECTION

function mainSection() {

    const mainEl = document.createElement("main")
    mainEl.setAttribute("class", "wrapper")
    const postEl = createPost()
    const feedEl = userPostsSection()
    mainEl.append(postEl, feedEl)
    rootEl.append(mainEl)
}

// CREATE POST SECTION

function createPost() {

    //  <section class="create-post-section">
    let createPostSection = document.createElement("section")
    createPostSection.setAttribute("class", "create-post-section")




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

    //     <input id="title" name="title" type="text" />
    let inputeTitle = document.createElement("input")
    inputeTitle.setAttribute("id", "title")
    inputeTitle.setAttribute("name", "title")
    inputeTitle.setAttribute("type", "text")
    createPostForm.append(inputeTitle)

    //     <label for="content">Content</label>
    let labelContent = document.createElement("label")
    labelContent.setAttribute("for", "content")
    labelContent.innerText = "Content"
    createPostForm.append(labelContent)

    //     <textarea id="content" name="content" rows="2" columns="30"></textarea>
    let textAreaContent = document.createElement("textarea")
    textAreaContent.setAttribute("id", "content")
    textAreaContent.setAttribute("name", "content")
    textAreaContent.setAttribute("rows", "2")
    textAreaContent.setAttribute("columns", "30")
    createPostForm.append(inputeTitle)

    //     <div class="action-btns">
    let actionBtn = document.createElement("div")
    actionBtn.setAttribute("class", "action-btns")
    createPostForm.append(actionBtn)

    //       <button id="preview-btn" type="button">Preview</button>
    let previewBtn = document.createElement("button")
    previewBtn.setAttribute("id", "preview-btn")
    previewBtn.setAttribute("type", "button")
    previewBtn.innerText = "Post"
    actionBtn.append(previewBtn)

    //       <button type="submit">Post</button>
    let postBtn = document.createElement("button")
    postBtn.setAttribute("type", "submit")
    postBtn.innerText = "Post"
    actionBtn.append(postBtn)
    const getUserId = state.users.find(function (user) {
        if (user.username === state.currentUser) {
            return user.id;
        }

        createPostForm.addEventListener("submit", function (event) {
            event.preventDefault()
            const newPost = {
                image: formEl.image.value,
                title: formEl.title.value,
                content: formEl.content.value,
                userId: getUserId.id,
                comments: [
                    {
                        content: "Wowww!!",
                        userId: 3,
                        postId: 3,
                    },
                ],
            };
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost)
            }).then((response) => {
                if (response.ok) {
                    setState({ posts: [...state.posts, newPost] });
                    formEl.reset();
                } else {
                    console.warn("Error");
                }
            });
        })
        return createPostSection
    }

        // FEED SECTION
        
        function userPostsSection() {
            const feedSectionEl = document.createElement('section');
            feedSectionEl.className = 'feed';

            const ulEl = document.createElement('ul');
            ulEl.className = 'stack';
            for (const post of state.posts) {
                const userPostEl = feedSection(post);
                ulEl.append(userPostEl);
            }
            feedSectionEl.append(ulEl)
            return feedSectionEl
        }

        function feedSection(post) {

            const liEl = document.createElement('li');
            liEl.setAttribute('class', 'post');
            const findUser = state.users.find(function (user) {
                return user.id === post.userId
            })

            const chipEl = userProfile(findUser)

            const postImgEl = document.createElement('div');
            postImgEl.setAttribute('class', 'post--image');



            const imgEl = document.createElement('img');
            // imgEl.setAttribute('src', post.image.src);
            imgEl.setAttribute('alt', post.image.alt);
            imgEl.setAttribute("src", post.image.src)
            postImgEl.append(imgEl);

            // POST CONTENT SECTION
            const postContentEl = document.createElement('div');
            postContentEl.setAttribute('class', 'post--content');

            const h2El = document.createElement('h2');
            h2El.innerText = post.title;

            const pEl = document.createElement('p');
            pEl.innerText = post.content;

            postContentEl.append(h2El, pEl);

            // POST COMMENTS SECTION
            const postCommentsEl = document.createElement('div');
            postCommentsEl.setAttribute('class', 'post--comments');

            const h3El = document.createElement('h3');
            h3El.innerText = 'Comments';

            postCommentsEl.append(h3El);

            for (const comment of post.comments) {
                const findUserComment = state.users.find(function (user) {
                    return user.id === comment.userId;
                });

                const postCommentEl = createElm("div", { className: "post--comment" });
                const avatarSmallEl = createElm("div", { className: "avatar-small" });
                const imgEL = createElm("img", {
                    src: findUserComment.avatar,
                    alt: findUserComment.username,
                });
                const commentPEl = createElm("p", { innerText: comment.content });
                avatarSmallEl.append(imgEL);
                postCommentEl.append(avatarSmallEl, commentPEl);
                postCommentsEl.append(postCommentEl);
            }

            const formEl = document.createElement('form');
            formEl.setAttribute('id', 'create-comment-form');
            formEl.setAttribute('autocomplete', 'off');

            const commentLabelEl = document.createElement('label');
            commentLabelEl.setAttribute('for', 'comment');
            commentLabelEl.innerText = 'Add comment';

            const commentInputEl = document.createElement('input');
            commentInputEl.setAttribute('id', 'comment');
            commentInputEl.setAttribute('name', 'comment');
            commentInputEl.setAttribute('type', 'text');

            const submitBtn = document.createElement('button');
            submitBtn.setAttribute('type', 'submit');
            submitBtn.innerText = 'Comment';

            formEl.append(commentLabelEl, commentInputEl, submitBtn);

            liEl.append(postImgEl, postContentEl, postCommentsEl, formEl);
            ulEl.append(liEl);
            feedSectionEl.append(ulEl);


            return liEl
        }



        function setState(setState) {
            state = { ...state, ...setState };
            render();
        }


        function getDataFromSever() {
            fetch("http://localhost:3000/users")
                .then((response) => response.json())
                .then((userdata) => {
                    state.users = userdata;
                    fetch("http://localhost:3000/posts")
                        .then((response) => response.json())
                        .then((postdata) => {
                            state.posts = postdata;
                            render();
                        });
                });
        }


        function render() {
            rootEl.innerHTML = "";
            headerSection();
            mainSection();
        }

        getDataFromSever()
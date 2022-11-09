console.log('index.js')
let lastElementArray = '';

const formBtn = document.querySelector('.formBtn');
const postsSection = document.querySelector('.postsSection');
const formSection = document.querySelector('.formSection');
const ul = document.querySelector('.postsContainer');

const inputTitle = document.querySelector('#title');
const inputName = document.querySelector('#name');
const inputBody = document.querySelector('#body');

window.addEventListener('hashchange', displayGlobal);
formBtn.addEventListener('click', test1)

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36);
    console.log(dateString + randomness)
    return dateString + randomness;
};

const getDate = () => {
    let currentDate = new Date().toJSON().slice(0, 10);
    return currentDate;
  };

async function test1 (e) {
    e.preventDefault();

    console.log(inputTitle.value);

    const data =  {
        postId: uniqueId(),
        title: inputTitle.value,
        body: inputBody.value,
        date: getDate()
    }

    postId = data.postId;

    submitPost(data).then((postArray) => {

        //console.log(postArray[postArray.length -1])
        lastElementArray = postArray[postArray.length -1]
        //console.log(lastElementArray)

        //url path changes then trigger displayGlobal
        window.location.href = `http://localhost:3000/${lastElementArray.postId}`;
    })

    //window.location.href = `http://localhost:3000/asdf`;

}

async function getOnePost(postId) {

    let url = `http://localhost:3000/posts/${postId}`
    const onePost = await fetch(url);
    const res = await onePost.json();
    console.log(res);

    return res;
}

function displayOnePost (data) {

    console.log(data)
    let title = data.title;
    let story = data.body;
    let date = data.date;
    
    const li = document.createElement('li');
    const titleParag = document.createElement('p');
    const storyParag = document.createElement('p');
    const dateParag = document.createElement('p');

    titleParag.textContent = title;
    storyParag.textContent = story;
    dateParag.textContent = date;

    li.append(titleParag, storyParag, dateParag)
    ul.append(li)
    console.log(li)

    formSection.hidden=true;
    postsSection.hidden=false
}

async function getAllPosts() {

    let url = `http://localhost:3000/posts`

    return new Promise(async (res, rej) => {
        try {
            const getAllPosts = await fetch(url);
            const response = await getAllPosts.json();
            //console.log(response);
            res(response)
        } catch (err) {
            rej(`Error retrieving posts: ${err}`)
        }
    })
}

async function submitPost(data) {

    let url = `http://localhost:3000/posts`
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'},
        }

    return new Promise(async (res, rej) => {
        try {
            const sendPost = await fetch(url, options);
            const response = await sendPost.json();

            res(response)
        } catch (err) {
            rej(`Error retrieving posts: ${err}`)
        }
    })
}

function displayGlobal() {

    let postId = '';
    const currentUrl = window.location.href;
    //console.log(currentUrl)
    //console.log(currentUrl.slice(22))

    if (currentUrl.length > 16) {

        getOnePost(currentUrl.slice(22)).then(res => {
        console.log(res)

        displayOnePost(res)

        })
        .catch((err) => {
        formSection.hidden=false;
        postsSection.hidden=true;

        })

        console.log('idpage only')
    } else {

        console.log('landing')
        formSection.hidden=false;
        postsSection.hidden=true;
    }

}

displayGlobal()

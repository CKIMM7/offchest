const fs = require('fs')
const moment = require('moment');

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

const getDate = () => {
  const date = moment();
  const currentDate = date.format('D/MM/YYYY');
  console.log(currentDate);

  return currentDate;
};

// read the json file(s)
const readData = (filePath, cb) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return cb && cb(err)
    try {
      const jsonData = JSON.parse(data)
      return cb && cb(null, jsonData)
    } catch (error) {
      return cb && cb(error)
    }
  })
}

// update json data to add new comment
const updatePostComments = (filePath, posts, postId, payload, response) => {
  new Promise((resolve, reject) => {
    posts.find(post => {
      if(post.postId == postId){
        const {comments} = post
        comments.push(payload)
        resolve(posts)
      }
    })
  }).then(res => {
    const allPosts = JSON.stringify(res, null, 2)
    fs.writeFile(filePath, allPosts, err => err ?? console.log(err))
  }).then(() => {
    console.log(`> new comment added on postId: ${postId}`)
    response.send(posts)
  })
  .catch(err => console.error(err))
}

const updateJSON = (filePath, data) => {
  data = JSON.stringify(data, null, 2)
  fs.writeFile(filePath, data, err => err ?? console.log(err))
}

module.exports= { uniqueId, getDate, readData, updatePostComments, updateJSON }
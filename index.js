import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn")

tweetBtn.addEventListener('click', () => {
  console.log(`tweetinput.value: ${tweetInput.value}`);
});

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  if (e.target.dataset.reply) {
    console.log(`Reply for ${e.target.dataset.reply}`)
  }
})


function handleLikeClick(tweetId) {
  // Iterate over tweetsData and use the uuid saved in tweetId to identify the liked tweet's object. 
  // Save that object to a new const called 'targetTweetObj'. Remove it from the array by specifying [0].
  // Increment like count by 1.
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]
  // if targetTweetObj was true, decrement by 1 and change prop to false.
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--
    targetTweetObj.isLiked = false
  }
  // if targetTweetObj was false, increment by 1.
  else {
    targetTweetObj.isLiked = true
    targetTweetObj.likes++
  }
  render()
}

  function getFeedHtml() {
    let feedHtml = ''

    tweetsData.forEach(function (tweet) {
      feedHtml +=
        `< div class="tweet" >
  <div class="tweet-inner">
    <img src="${tweet.profilePic}" class="profile-pic">
      <div>
        <p class="handle">${tweet.handle}</p>
        <p class="tweet-text">${tweet.tweetText}</p>
        <div class="tweet-details">
          <span class="tweet-detail">
            <i class="fa-regular fa-comment-dots"
              data-reply="${tweet.uuid}"
            ></i>
            ${tweet.replies.length}
          </span>
          <span class="tweet-detail">
            <i class="fa-solid fa-heart"
              data-like="${tweet.uuid}"
            ></i>
            ${tweet.likes}
          </span>
          <span class="tweet-detail">
            <i class="fa-solid fa-retweet"
              data-retweet="${tweet.uuid}"
            ></i>
            ${tweet.retweets}
          </span>
        </div>
      </div>
  </div>
    </div > `
    })
    return feedHtml
  }

  function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
  }

  render()
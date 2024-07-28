import { tweetsData } from "./data.js";
import { v4 as uuid4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  }
  else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet)
  }
  else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  }
  else if (e.target.id === 'tweet-btn') {
    handleTweetBtnClick()
  }
  else if (e.target.id === 'reply-input-btn') {
    handleReplyInputBtnClick()
  }
})

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");
  
  if (!tweetInput.value) {
    console.log(`needs text`);
  }
  else {
    tweetsData.unshift({
      handle: '@scrimba_jules',
      profilePic: 'images/scrimbalogo.png',
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuid4()
    })
    render()
    tweetInput.value = ''
  }
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId
  })[0]

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--
  }
  else {
    targetTweetObj.likes++
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked
  render()
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0]
  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++
  }
  else {
    targetTweetObj.retweets--
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
  render()
}

// Doesn't save or display yet
function handleReplyInputBtnClick() {
  const replyInput = document.getElementById("reply-input") 

  // Not sure if this will be stored in a separate data file, or in the same tweetsData.js and be given a reply boolean.
    // handle: '@scrimba_jules',
		// profilePic: 'images/scrimbalogo.png',
		// tweetText: ${replyInput}
    // `
    console.log(replyInput.value);
    
    render()
}

function getFeedHtml() {
  let feedHtml = ''

  tweetsData.forEach(function (tweet) {
    let likeIconClass = ''
    let retweetIconClass = ''
    let replyIconClass = 'hidden'
    let repliesHtml = `
      <div class="tweet-reply">
        <div class="tweet-input-area">
          <img
            src="images/scrimbalogo.png"
            class="profile-pic" 
            alt="profile">
          <textarea
            name="tweet-input"
            id="reply-input"
            placeholder="BE NICE."></textarea>
        </div>
        <button id="reply-input-btn">reply</button>
      </div>
      `
    let tweetReplies = tweet.replies

    if (tweet.isLiked) {
      likeIconClass = 'liked'
    }
    if (tweet.isRetweeted) {
      retweetIconClass = 'retweeted'
    }

    if (tweetReplies.length > 0) {
      tweetReplies.forEach(function (reply) {
        repliesHtml += `
          <div class="tweet-reply">
            <div class="tweet-inner">
              <img src="${reply.profilePic}" class="profile-pic" >
              <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
              </div>
            </div>
          </div>
          `
        return repliesHtml
      })
    }

    feedHtml += `
      <div class="tweet">
        <div class="tweet-inner">
          <img src="${tweet.profilePic}" class="profile-pic">
          <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
              <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots"
                  data-reply="${tweet.uuid}">
                </i>
                ${tweet.replies.length}
              </span>
              <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}"
                  data-like="${tweet.uuid}">
                </i>
                ${tweet.likes}
              </span>
              <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}"
                  data-retweet="${tweet.uuid}">
                </i>
                ${tweet.retweets}
              </span>
            </div>
          </div>
        </div>
        <div class="${replyIconClass}" id="replies-${tweet.uuid}">
          ${repliesHtml}
        </div>
      </div>
      `
  })
  return feedHtml
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml()
}

render()
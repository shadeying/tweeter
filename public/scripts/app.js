/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function createTweetElement(tweetObject){
    //header
    const avatar = $(`<img src=${tweetObject.user.avatars.regular}>`);
    const name = $("<span>").addClass("display-name").append($("<h2>").text(tweetObject.user.name));
    const handle = $("<span>").addClass("username").text(tweetObject.user.handle);
    const header = $("<header>").append(avatar, name, handle);

    //tweet content
    const tweetContent = $("<p>").text(tweetObject.content.text);

    //create horizontal line
    const line = $("<hr>");

    //footer
    const days = Math.floor((Date.now() - tweetObject.created_at) / (1000 * 60 * 60 * 24));
    const time = $("<p>").text(`${days} days ago`);
    const flag = $(`<span><img src="/images/flag.png"></span>`);
    const retweet = $(`<span><img src="/images/retweet.png"></span>`);
    const like = $(`<span><img src="/images/heart.png"></span>`);
    const action = $("<span>").addClass("actions").append(flag, retweet, like);
    const footer = $("<footer>").append(time, action);

    return $("<article>").addClass("single-tweet").append(header, tweetContent, line, footer);
  }

  function renderTweets(tweetArray){
    tweetArray.forEach(function(tweetObject){
      $("section.tweets-container").append(createTweetElement(tweetObject));
    });
  }

  const data = [
  {
    "user": {
      "name": "Thanos",
      "avatars": {
        "small":   "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3",
        "regular": "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3",
        "large":   "https://preview.redd.it/udxpo5xhyu811.jpg?width=960&crop=smart&auto=webp&s=d2e1870c7378d7d626c83f7c79a1f0cce0ea36e3"
      },
      "handle": "@CuteThanos"
    },
    "content": {
      "text": "I am inevitable!!!!"
    },
    "created_at": 1550056232227
  },
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

renderTweets(data);

});
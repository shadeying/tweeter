/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  function createTweetElement(tweetObject){
    //header
    const avatar = $(`<img src=${tweetObject.user.avatars.regular}>`);
    const name = $("<span>").addClass("display-name").append($("<h3>").text(tweetObject.user.name));
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
    $(".tweets-container").empty();
    tweetArray.reverse().forEach(function(tweetObject){
      $("section.tweets-container").append(createTweetElement(tweetObject));
    });
  }

  function loadTweets(){
    $.get("/tweets", renderTweets);
  }

  loadTweets();

  $( "form" ).submit(function(event) {
    event.preventDefault();
    const text = document.querySelector("textarea");

    if(text.value && text.value.length <= 140){
      $.post( $( this ).attr("action"), $( this ).serialize(), loadTweets);
      text.value = "";
      $( "span.counter" ).text(140);
    }else{
      $( "div.error" ).slideDown();
      if(!text.value){
        $( "#missing-input" ).slideDown();
      }else{
        $( "#exceed" ).slideDown();
      }
    }
  });

  $( "#compose-button" ).click(function(){
    $( "section.new-tweet" ).slideToggle();
    $( "textarea[name=text]" ).focus();
  });


});
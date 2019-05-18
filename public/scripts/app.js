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
    const header = $("<header>").append(avatar, name, handle).attr("id", tweetObject._id);

    //tweet content
    const tweetContent = $("<p>").text(tweetObject.content.text);

    //create horizontal line
    const line = $("<hr>");

    //footer
    const date = calculateTime(tweetObject.created_at);
    const time = $("<p>").text(`${date.time} ${date.unit} ago`);
    const flag = $(`<i class="fa fa-flag"></i>`);
    const retweet = $(`<i class="fa fa-retweet"></i>`);
    const like = $(`<form method="POST" action="/tweets/likes/"><button type="submit" class="like-button"><i class="fa fa-heart"></i></button></form>`);
    const likeCount = $(`<p class="like-count">${tweetObject.like}</p>`);
    const action = $("<span>").addClass("actions").append(flag, retweet, like,likeCount);
    const footer = $("<footer>").append(time, action);

    return $("<article>").addClass("single-tweet").append(header, tweetContent, line, footer);
  }

  //to calculate the time difference from now to when the tweet was created
  function calculateTime(date){
    const years = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24 * 365));
    if(!years){
      const months = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24 * 30));
      if(!months){
        const days = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
        if(!days){
          const hours = Math.floor((Date.now() - date) / (1000 * 60 * 60));
          if(!hours){
            const minutes = Math.floor((Date.now() - date) / (1000 * 60));
            if(!minutes){
              const seconds = Math.floor((Date.now() - date) / (1000));
              return {time: seconds, unit: "seconds"};
            }else{
              return {time: minutes, unit: "minutes"};
            }
          }else{
            return {time: hours, unit: "hours"};
          }
        }else{
          return {time: days, unit: "days"};
        }
      }else{
        return {time: months, unit: "months"};
      }
    }else{
      return {time: years, unit: "years"};
    }
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

  $( ".new-tweet form" ).submit(function(event) {
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

  $(document).on( "click", "button.like-button", function(event) {
    event.preventDefault();
    let count = 1;
    if($(this).parents(".actions").find(".like-count").text() === "1"){
      count = 0;
    }
    $(this).parents(".actions").find(".like-count").text(count);
    const id = $(this).parents("article.single-tweet").find("header").attr("id");
    $.post("/tweets/likes/", { "like": count, "id": id}, loadTweets);
  });

  $.get()

});
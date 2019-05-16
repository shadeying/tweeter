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
    const date = calculateTime(tweetObject.created_at);
    const time = $("<p>").text(`${date.time} ${date.unit} ago`);
    const flag = $(`<span><img src="/images/flag.png"></span>`);
    const retweet = $(`<span><img src="/images/retweet.png"></span>`);
    const like = $(`<span><img src="/images/heart.png"></span>`);
    const action = $("<span>").addClass("actions").append(flag, retweet, like);
    const footer = $("<footer>").append(time, action);

    return $("<article>").addClass("single-tweet").append(header, tweetContent, line, footer);
  }

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
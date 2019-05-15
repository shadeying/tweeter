$(document).ready(function() {

  $( "article.single-tweet" ).hover(
    function() {
      $( this ).addClass( "hover" );
      const target = document.querySelector("article.single-tweet.hover span.actions");
      $( target ).addClass( "hover" );
    },

    function(){
      $( this ).removeClass( "hover" );
      $( "span.actions" ).removeClass( "hover" );
    });

});

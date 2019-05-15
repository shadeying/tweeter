$(document).ready(function() {

  $( "article.single-tweet" ).hover(
    function() {
      $( this ).addClass( "hover" );
      $( "span.actions" ).addClass( "hover" );
    },

    function(){
      $( this ).removeClass( "hover" );
      $( "span.actions" ).removeClass( "hover" );
    });

});

$(document).ready(function() {

  $( "textarea[name=text]" ).keyup(function() {
    const text = this.value;
    let wordCount = 140;

    wordCount -= text.length;
    $( "span.counter" ).text(wordCount);

    if(wordCount < 0){
      document.getElementsByClassName("counter")[0].style.color = "red";
    }

  });

});
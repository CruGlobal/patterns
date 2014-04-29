$(document).ready(function(){
    $('.js-has-dropdown').click(function(e) {
          $('body').toggleClass("menu-active"); //you can list several class names 
          $('.js-has-dropdown').toggleClass("active"); 
          e.preventDefault();
    });
});
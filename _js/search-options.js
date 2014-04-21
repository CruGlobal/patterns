$(document).ready(function(){
    $('.js-search-menu').click(function(e) {
          $('body').toggleClass("menu-active"); //you can list several class names 
          $('.js-primary-search').toggleClass("active"); 
          e.preventDefault();
    });
});
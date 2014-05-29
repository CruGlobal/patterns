$(".site--select").change(function() {
  window.location = $(this).find("option:selected").val();
});

/*
* Detect Browser Width
*/

// On Page Load
$(window).ready(function() {
    var wi = $(window).width();  
    if (wi <= 980){
            $( ".nav" ).removeClass( ".dropdown" ).addClass( ".off-canvas-desk" );
            }
        else {
            $( ".nav" ).removeClass( ".off-canvas-desk" ).addClass( ".dropdown" );
            }
    // On Window Resize
    $(window).resize(function() {
        var wi = $(window).width();

        if (wi <= 980){
            $( ".nav" ).removeClass( ".dropdown" ).addClass( ".off-canvas-desk" );
            }
        else {
            $( ".nav" ).removeClass( ".off-canvas-desk" ).addClass( ".dropdown" );
            }
    });            
});
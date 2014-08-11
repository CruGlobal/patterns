$(".site--select").change(function() {
  window.location = $(this).find("option:selected").val();
});

/* 
 * Desktop Nav Tab Stays Dark When Hovering Over Related Subnav
 */

 $("div.dropdown").hover(
 	function() {
  		$(this).prev("a").addClass("is-active");
  	}, function() {
  		$(this).prev("a").removeClass("is-active");
	});

if($("html").hasClass("ie8")){
    $("a[title='Return to Homepage']").first().addClass('ie-logo').append('<img src="/assets/images/cru-logo.png" alt="" width="103" height="64">');
}
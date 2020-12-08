;$(function(){
	$(".drowp-down").click(function(){
		$(this).siblings().next(".drowp-down-layer").hide();
		$(this).next(".drowp-down-layer").toggle();
	});
	$(".drowp-down-layer span").click(function(){
		var bool;
		if ($(this).index()==0) {
			if (!$(this).hasClass("acitve")) {
				$(this).addClass("acitve").siblings().removeClass("acitve");
			}
		} else{
			$(this).toggleClass("acitve");
			$(this).parent().children().eq(0).removeClass("acitve");
		}
	});
	
});



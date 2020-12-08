$(function(){
	var slide = $(".swiper-container .swiper-slide");
	var imgAHeight =parseFloat(slide.eq(0).find("img").css("width")) * 0.75;
	for (var i=0;i<slide.length;i++) {
		slide.eq(i).find("img").css("height",imgAHeight);
	}
});

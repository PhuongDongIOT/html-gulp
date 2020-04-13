$(document).ready(function(){
	var topBtn = $('#pageTop');

    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $("#globalNavi").meanmenu();

	if($('ul').hasClass("bxslider")){
		var slider = $('.bxslider').bxSlider({
		  controls: false,
		  pager: false,
		  mode: 'fade',
		  auto: true,
		  pause: 5000
		});
	};
});

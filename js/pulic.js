//动态设置缩放比例
function scal(){
	var scal = 2 / devicePixelRatio;
	$('#viewport').attr('content','initial-scale=' + scal + ', maximum-scale=' + scal + ', minimum-scale=' + scal + ', user-scalable=no')
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
}

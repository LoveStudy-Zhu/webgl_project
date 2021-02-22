var leftContent  = document.querySelector(".left-content");
var rightContent  = document.querySelector(".right-content");
var textCircle   = document.querySelector(".text-circle");

//先是leftContent旋转角度从0增加到180度，
//然后是rightContent旋转角度从0增加到180度
var angle = 0;

var timerId = setInterval(function(){
	angle += 36;
	if(angle > 216){
		clearInterval(timerId);
	}else{
		if(angle > 180){
			rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
		}else{
			leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
		}
		setPercent(angle);
		
	}
},500);

function setPercent(angle){
  textCircle.innerHTML = parseInt(angle*100/360) +'%';
}

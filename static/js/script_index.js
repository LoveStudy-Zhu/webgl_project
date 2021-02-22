var app = new Vue({

	el: '#main',
	data: {

		content: "<a href='https://www.baidu.com'>xxxxxxx</a>",
		isShow: true,
		imgSrc: "",
		index: 0,
		arr: ["img/地铁里的上班族.png", "img/画板 1.png"]
	},
	methods: {
		EveryDayTasks: function() {
			app2.isActive = true;
		},
		OpenLeft: function() {
			app3.isActive = true;
			console.log(app3.isActive)
		},
		CityLife: function() {
			window.location.href = 'city.html';
		},
		Sound: function() {
			window.location.href = 'sound.html';
		},
		CityRescue:function(){
			window.location.href = 'rescue.html'
		},
		testClick: function() {
			this.isActive = !this.isActive
		},
		tanBao:function(){
			window.location.href = 'tanbao.html'
		},
		shoppingCenter:function(){
			window.location.href = '积分商城.html'
		}
		,
		egg:function(){
			window.location.href = '扭蛋机.html'
		}
		,
		changeImage:function(){
			if (this.index==0){
				this.index=1
			}else{
				this.index=0
			}
		}
	}
})

var app2 = new Vue({
	el: '#tasks',
	data: {
		isActive: false,
	},
	methods: {
		close: function() {
			this.isActive = false;
		}
	}
})
var app3 = new Vue({
	el: '#my_message',
	data: {
		isActive: false,
	},
	methods: {
		close: function() {
			this.isActive = false;
		}
	}
})



window.setInterval(() => {
	setTimeout(app.changeImage(), 0)
}, 3000)

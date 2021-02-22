
var app1 = new Vue({
	
    el:'#main',
    data:{
		index:0,
		imgarr:["img/寿司店2_1.png","img/日本寿司店.png"],
		color:"#585858",
		margin_left:"0px"
    },
    methods:{
		Left:function(){
			this.index=0
			this.color="#585858"
			this.margin_left="0px"
		},
		Right:function(){
			this.index=1
			this.color="whitesmoke"
			this.margin_left="120px"
		},
		Back:function(){
			window.location.href='index.html';
		}
    }
})

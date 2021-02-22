
const app = new Vue({
  el: '#container',
  data: {
    eggs: new Array(11),
    // isDropping: true,//刚打开页面时的掉落动画
    isDrawing: false,//控制抽奖时的动画
    reward: 0, //抽奖结果
    showEggHole: false,
    showDialog: false,
    myCredit: 1000, //我的积分
  },
  methods: {
	  Back:function(){
	  	
	  	window.location.href='index.html';
	  },
    startDraw() {
      if (this.isDrawing)
        return;
      this.isDrawing = true;
      this.myCredit -= 100;
      const reward = Math.ceil(Math.random() * 4)
      setTimeout(() => {
        this.showEggHole = true;
        this.reward = reward;
      }, 2000);
      setTimeout(() => {
        this.isDrawing = false;
        this.showDialog = true;
      }, 3000);
    },

    handleConfirmBtnClick() {
      this.reward = 0;
      this.showDialog = false;
      this.showEggHole = false;
    }
  },
  computed: {
    rewardImgPath: function () {
      return `./src/images/zj_${this.reward}.png`;
    }
  }
})


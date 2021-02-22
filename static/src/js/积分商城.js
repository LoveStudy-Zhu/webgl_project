let app = new Vue({
  el: '#container',
  data: {
    goods: couponStoreData,
    shoppingCart: shoppingCartData, //购物车数据
    navigator: 1, //导航栏状态，为1则在首页，为2则在购物车
  },
  methods: {

  },
  computed: {
    // 计算购物车总价格
    cartTotalPrice: function () {
      let totalPrice = 0;
      this.shoppingCart.forEach(ele => {
        totalPrice += Number(ele.price);
      });
      return totalPrice;
    }
  }
});

window.onload = function () {
  // 瀑布流布局第三方库
  var msnry = new Masonry('.grid', {
    itemSelector: '.grid-item',
    // columnWidth: '50%'
  });
}

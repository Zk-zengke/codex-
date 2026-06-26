Page({
  data: {
    photoUrl: 'https://raw.githubusercontent.com/Zk-zengke/xiaoke/406ce4e79c6051ad8579c3624f9006ff94fe96a1/uploads/photos/121_%E5%B0%8F%E5%8F%AF_%E6%B5%B7%E8%BE%B9%E6%B3%B3%E8%A3%85%E5%9B%9E%E5%A4%B4%E7%85%A7.png',
    dailyMeals: [
      {
        name: '早餐',
        desc: '燕麦 + 鸡蛋 + 牛奶，补充碳水、蛋白质和钙。'
      },
      {
        name: '午餐',
        desc: '米饭 + 鸡胸肉 + 西兰花，注意主食、肉类、蔬菜搭配。'
      },
      {
        name: '晚餐',
        desc: '杂粮粥 + 豆腐 + 青菜，尽量清淡，避免过油。'
      }
    ],
    tips: [
      '每天尽量保证蔬菜、水果、蛋白质和主食都摄入。',
      '购物前先列清单，可以减少遗漏和浪费。',
      '本项目数据仅作学习展示，不替代专业医学建议。'
    ]
  },

  goFoods() {
    wx.switchTab({
      url: '/pages/foods/foods'
    });
  },

  goShopping() {
    wx.switchTab({
      url: '/pages/shopping/shopping'
    });
  }
});

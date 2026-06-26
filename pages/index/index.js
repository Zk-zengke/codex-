Page({
  data: {
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

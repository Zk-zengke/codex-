const storage = require('../../utils/storage');

Page({
  data: {
    foods: [
      {
        id: 1,
        name: '鸡蛋',
        category: '优质蛋白',
        desc: '鸡蛋容易购买和烹饪，适合作为早餐或加餐。',
        nutrition: ['蛋白质', '卵磷脂', '维生素B族']
      },
      {
        id: 2,
        name: '西兰花',
        category: '蔬菜',
        desc: '西兰花热量较低，适合搭配主食和肉类。',
        nutrition: ['膳食纤维', '维生素C', '钾']
      },
      {
        id: 3,
        name: '燕麦',
        category: '主食',
        desc: '燕麦饱腹感较强，适合做早餐。',
        nutrition: ['碳水化合物', '膳食纤维', 'β-葡聚糖']
      },
      {
        id: 4,
        name: '鸡胸肉',
        category: '肉类',
        desc: '鸡胸肉脂肪较低，常用于高蛋白饮食搭配。',
        nutrition: ['蛋白质', '烟酸', '磷']
      },
      {
        id: 5,
        name: '豆腐',
        category: '豆制品',
        desc: '豆腐口感软，适合清炒、煮汤或凉拌。',
        nutrition: ['植物蛋白', '钙', '大豆异黄酮']
      }
    ]
  },

  addToShopping(event) {
    const name = event.currentTarget.dataset.name;
    storage.addShoppingItem(name);
    wx.showToast({
      title: '已加入清单',
      icon: 'success'
    });
  }
});

const storage = require('../../utils/storage');

Page({
  data: {
    shoppingCount: 0
  },

  onShow() {
    this.refreshInfo();
  },

  refreshInfo() {
    const list = storage.getShoppingList();
    this.setData({
      shoppingCount: list.length
    });
  },

  clearAllData() {
    wx.showModal({
      title: '确认清空？',
      content: '这会删除本地保存的购物清单。',
      success: (result) => {
        if (result.confirm) {
          storage.saveShoppingList([]);
          this.refreshInfo();
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});

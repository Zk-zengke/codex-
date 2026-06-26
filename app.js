App({
  globalData: {
    appName: '健康饮食助手'
  },

  onLaunch() {
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    if (!wx.getStorageSync('shoppingList')) {
      wx.setStorageSync('shoppingList', []);
    }
  }
});

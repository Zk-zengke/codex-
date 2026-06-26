const storage = require('../../utils/storage');

Page({
  data: {
    inputValue: '',
    list: [],
    activeCount: 0
  },

  onLoad() {
    this.refreshList();
  },

  onShow() {
    this.refreshList();
  },

  refreshList() {
    const list = storage.getShoppingList();
    const activeCount = list.filter((item) => !item.checked).length;
    this.setData({
      list,
      activeCount
    });
  },

  handleInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },

  addItem() {
    const value = this.data.inputValue.trim();

    if (!value) {
      wx.showToast({
        title: '请输入食材',
        icon: 'none'
      });
      return;
    }

    storage.addShoppingItem(value);
    this.setData({ inputValue: '' });
    this.refreshList();
  },

  toggleItem(event) {
    const id = event.currentTarget.dataset.id;
    storage.toggleShoppingItem(id);
    this.refreshList();
  },

  deleteItem(event) {
    const id = event.currentTarget.dataset.id;
    storage.removeShoppingItem(id);
    this.refreshList();
  },

  clearChecked() {
    storage.clearCheckedItems();
    this.refreshList();
  }
});

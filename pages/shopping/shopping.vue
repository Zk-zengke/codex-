<template>
  <view class="container shopping-page">
    <view class="card input-card">
      <view class="subtitle">购物清单</view>
      <view class="input-row">
        <input
          class="food-input"
          v-model="inputValue"
          placeholder="输入要购买的食材"
          confirm-type="done"
          @confirm="addItem"
        />
        <button class="add-button" @click="addItem">添加</button>
      </view>
      <view class="text-muted count-text">未完成：{{ activeCount }} 项</view>
    </view>

    <view v-if="list.length === 0" class="card empty">暂无购物清单，先去食材页添加吧。</view>

    <view v-else class="list-card card">
      <view v-for="item in list" :key="item.id" class="shopping-item">
        <view class="item-main" @click="toggleItem(item.id)">
          <text class="check-box" :class="{ checked: item.checked }">{{ item.checked ? '✓' : '' }}</text>
          <view>
            <view class="item-name" :class="{ done: item.checked }">{{ item.name }}</view>
            <view class="item-time">{{ item.createdAt }}</view>
          </view>
        </view>
        <button class="delete-button" @click="deleteItem(item.id)">删除</button>
      </view>
    </view>

    <button v-if="list.length" class="secondary-button" @click="clearChecked">清除已完成</button>
  </view>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
  data() {
    return {
      inputValue: '',
      list: [],
      activeCount: 0
    }
  },
  onLoad() {
    this.refreshList()
  },
  onShow() {
    this.refreshList()
  },
  methods: {
    refreshList() {
      const list = storage.getShoppingList()
      const activeCount = list.filter((item) => !item.checked).length
      this.list = list
      this.activeCount = activeCount
    },
    addItem() {
      const value = this.inputValue.trim()

      if (!value) {
        uni.showToast({
          title: '请输入食材',
          icon: 'none'
        })
        return
      }

      storage.addShoppingItem(value)
      this.inputValue = ''
      this.refreshList()
    },
    toggleItem(id) {
      storage.toggleShoppingItem(id)
      this.refreshList()
    },
    deleteItem(id) {
      storage.removeShoppingItem(id)
      this.refreshList()
    },
    clearChecked() {
      storage.clearCheckedItems()
      this.refreshList()
    }
  }
}
</script>

<style>
.input-card {
  margin-top: 0;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 22rpx;
}

.food-input {
  flex: 1;
  height: 76rpx;
  box-sizing: border-box;
  padding: 0 24rpx;
  border-radius: 18rpx;
  background: #f1f8e9;
  color: #263238;
  font-size: 28rpx;
}

.add-button {
  flex-shrink: 0;
  width: 136rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 18rpx;
  color: #ffffff;
  background: #2f7d32;
  font-size: 28rpx;
}

.count-text {
  margin-top: 18rpx;
}

.shopping-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #edf2ef;
}

.shopping-item:last-child {
  border-bottom: 0;
}

.item-main {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.check-box {
  flex-shrink: 0;
  width: 42rpx;
  height: 42rpx;
  margin-right: 18rpx;
  border: 2rpx solid #a5d6a7;
  border-radius: 50%;
  text-align: center;
  line-height: 42rpx;
  color: #ffffff;
  font-size: 26rpx;
}

.check-box.checked {
  border-color: #2f7d32;
  background: #2f7d32;
}

.item-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #263238;
}

.item-name.done {
  color: #90a4ae;
  text-decoration: line-through;
}

.item-time {
  margin-top: 6rpx;
  color: #90a4ae;
  font-size: 22rpx;
}

.delete-button {
  width: 112rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 999rpx;
  color: #ef5350;
  background: #ffebee;
  font-size: 24rpx;
}
</style>

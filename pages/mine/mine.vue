<template>
  <view class="container mine-page">
    <view class="card profile-card">
      <view class="avatar">🥗</view>
      <view>
        <view class="title">健康饮食助手</view>
        <view class="text-muted">uni-app 课程项目版本</view>
      </view>
    </view>

    <view class="card stat-card">
      <view class="subtitle">本地数据统计</view>
      <view class="stat-row">
        <text>购物清单数量</text>
        <text class="stat-number">{{ shoppingCount }}</text>
      </view>
      <view class="stat-row">
        <text>未完成数量</text>
        <text class="stat-number">{{ activeCount }}</text>
      </view>
    </view>

    <view class="card">
      <view class="subtitle">项目说明</view>
      <view class="text-muted">
        本项目用于移动应用程序设计课程展示，主要实现食材营养查看、购物清单记录和本地数据管理。
      </view>
      <button class="danger-button" @click="clearAllData">清空本地数据</button>
    </view>
  </view>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
  data() {
    return {
      shoppingCount: 0,
      activeCount: 0
    }
  },
  onShow() {
    this.refreshInfo()
  },
  methods: {
    refreshInfo() {
      const list = storage.getShoppingList()
      this.shoppingCount = list.length
      this.activeCount = list.filter((item) => !item.checked).length
    },
    clearAllData() {
      uni.showModal({
        title: '确认清空？',
        content: '这会删除本地保存的购物清单。',
        success: (result) => {
          if (result.confirm) {
            storage.saveShoppingList([])
            this.refreshInfo()
            uni.showToast({
              title: '已清空',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
.profile-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-top: 0;
}

.avatar {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  background: #e8f5e9;
  text-align: center;
  line-height: 104rpx;
  font-size: 52rpx;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #edf2ef;
  color: #455a64;
  font-size: 28rpx;
}

.stat-row:last-child {
  border-bottom: 0;
}

.stat-number {
  color: #2f7d32;
  font-size: 36rpx;
  font-weight: 700;
}
</style>

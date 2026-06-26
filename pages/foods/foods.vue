<template>
  <view class="container foods-page">
    <view class="card intro-card">
      <view class="subtitle">常见食材营养</view>
      <view class="text-muted">点击“加入清单”，可以把食材保存到购物清单里。</view>
    </view>

    <view v-for="item in foods" :key="item.id" class="food-card card">
      <view class="food-header">
        <view>
          <view class="food-name">{{ item.name }}</view>
          <view class="food-category">{{ item.category }}</view>
        </view>
        <button class="add-button" @click="addToShopping(item.name)">加入清单</button>
      </view>

      <view class="text-muted food-desc">{{ item.desc }}</view>

      <view class="nutrition-list">
        <text v-for="tag in item.nutrition" :key="tag" class="nutrition-tag">{{ tag }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
  data() {
    return {
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
    }
  },
  methods: {
    addToShopping(name) {
      storage.addShoppingItem(name)
      uni.showToast({
        title: '已加入清单',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
.intro-card {
  margin-top: 0;
}

.food-card {
  margin-top: 24rpx;
}

.food-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.food-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #263238;
}

.food-category {
  display: inline-block;
  margin-top: 8rpx;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background: #e8f5e9;
  color: #2f7d32;
  font-size: 24rpx;
}

.add-button {
  flex-shrink: 0;
  width: 168rpx;
  height: 64rpx;
  line-height: 64rpx;
  border-radius: 999rpx;
  color: #ffffff;
  background: #2f7d32;
  font-size: 24rpx;
}

.food-desc {
  margin-top: 20rpx;
}

.nutrition-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 20rpx;
}

.nutrition-tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #f1f8e9;
  color: #558b2f;
  font-size: 24rpx;
}
</style>

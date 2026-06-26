<template>
  <view class="container index-page">
    <view class="hero card">
      <view class="title">健康饮食助手</view>
      <view class="text-muted hero-desc">
        帮你快速查看食材营养、记录购物清单，适合作为微信小程序课程项目基础版本。
      </view>
      <button class="primary-button" @click="goFoods">查看食材营养</button>
    </view>

    <view class="card">
      <view class="subtitle">今日饮食建议</view>
      <view v-for="item in dailyMeals" :key="item.name" class="meal-item">
        <view class="meal-name">{{ item.name }}</view>
        <view class="text-muted">{{ item.desc }}</view>
      </view>
    </view>

    <view class="card">
      <view class="subtitle">小提醒</view>
      <view v-for="item in tips" :key="item" class="tip-item">{{ item }}</view>
      <button class="secondary-button" @click="goShopping">打开购物清单</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
  methods: {
    goFoods() {
      uni.switchTab({
        url: '/pages/foods/foods'
      })
    },
    goShopping() {
      uni.switchTab({
        url: '/pages/shopping/shopping'
      })
    }
  }
}
</script>

<style>
.hero {
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
}

.hero-desc {
  margin-top: 14rpx;
}

.meal-item {
  padding: 22rpx 0;
  border-bottom: 1rpx solid #edf2ef;
}

.meal-item:last-child {
  border-bottom: 0;
}

.meal-name {
  margin-bottom: 8rpx;
  font-size: 30rpx;
  font-weight: 700;
  color: #263238;
}

.tip-item {
  margin-bottom: 14rpx;
  padding-left: 18rpx;
  border-left: 6rpx solid #a5d6a7;
  color: #546e7a;
  font-size: 27rpx;
  line-height: 1.6;
}
</style>

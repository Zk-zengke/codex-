<script>
export default {
  onLaunch() {
    const logs = uni.getStorageSync('logs') || []
    logs.unshift(Date.now())
    uni.setStorageSync('logs', logs)

    if (!uni.getStorageSync('shoppingList')) {
      uni.setStorageSync('shoppingList', [])
    }

    console.log('健康饮食助手 uni-app 启动成功')
  }
}
</script>

<style>
page {
  min-height: 100%;
  background: #f6f8f5;
  color: #263238;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.container {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 32rpx;
  background: #f6f8f5;
}

.card {
  margin-top: 24rpx;
  padding: 28rpx;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: 0 10rpx 30rpx rgba(47, 125, 50, 0.08);
}

.title {
  font-size: 42rpx;
  font-weight: 700;
  color: #2f7d32;
}

.subtitle {
  margin-bottom: 18rpx;
  font-size: 32rpx;
  font-weight: 700;
  color: #2f7d32;
}

.text-muted {
  color: #78909c;
  font-size: 26rpx;
  line-height: 1.7;
}

.primary-button,
.secondary-button,
.danger-button {
  margin: 22rpx 0 0;
  border-radius: 999rpx;
  font-size: 28rpx;
}

.primary-button {
  color: #ffffff;
  background: #2f7d32;
}

.secondary-button {
  color: #2f7d32;
  background: #e8f5e9;
}

.danger-button {
  color: #ffffff;
  background: #ef5350;
}

.empty {
  padding: 60rpx 0;
  text-align: center;
  color: #90a4ae;
  font-size: 28rpx;
}
</style>

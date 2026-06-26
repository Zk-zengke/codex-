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
  width: 100%;
  max-width: 760px;
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 32rpx 32rpx calc(130rpx + env(safe-area-inset-bottom));
  background: #f6f8f5;
}

.card {
  width: 100%;
  box-sizing: border-box;
  margin-top: 24rpx;
  padding: 28rpx;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: 0 10rpx 30rpx rgba(47, 125, 50, 0.08);
}

.title {
  font-size: clamp(32rpx, 5.2vw, 46rpx);
  font-weight: 700;
  color: #2f7d32;
  line-height: 1.3;
}

.subtitle {
  margin-bottom: 18rpx;
  font-size: clamp(28rpx, 4.4vw, 36rpx);
  font-weight: 700;
  color: #2f7d32;
  line-height: 1.35;
}

.text-muted {
  color: #78909c;
  font-size: clamp(24rpx, 3.7vw, 30rpx);
  line-height: 1.7;
}

.primary-button,
.secondary-button,
.danger-button {
  width: 100%;
  max-width: 640px;
  margin: 22rpx auto 0;
  border-radius: 999rpx;
  font-size: clamp(26rpx, 4vw, 32rpx);
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

@media screen and (min-width: 900px) {
  .container {
    max-width: 720px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .card {
    padding: 28px;
    border-radius: 24px;
  }
}
</style>

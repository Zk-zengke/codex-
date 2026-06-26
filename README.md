# 健康饮食助手（uni-app 版本）

这是一个已经迁移为 uni-app 的课程项目，可以运行到 H5，也可以编译成微信小程序。

## 项目功能

- 首页：展示每日饮食建议和健康提醒
- 食材页：展示常见食材营养，并支持加入购物清单
- 购物清单：支持添加、完成、删除、清除已完成
- 我的页：查看本地数据统计，并支持清空数据

## Codespaces 运行方法

先拉取最新代码：

```bash
git pull
```

如果之前安装失败或运行失败，先清理旧依赖：

```bash
rm -rf node_modules package-lock.json
```

重新安装依赖：

```bash
npm install
```

运行 H5：

```bash
npm run dev:h5
```

运行成功后，终端会输出类似 `http://localhost:5173/` 的地址。如果是在 Codespaces，看到端口提示后点击 Open in Browser。

## 编译成微信小程序

```bash
npm run dev:mp-weixin
```

编译完成后，用本地电脑的微信开发者工具打开：

```text
dist/dev/mp-weixin
```

注意：微信小程序模拟器必须用本地电脑上的微信开发者工具，Codespaces 里不能直接打开微信模拟器。

## 主要 uni-app 文件

```text
App.vue
main.js
pages.json
manifest.json
vite.config.js
pages/index/index.vue
pages/foods/foods.vue
pages/shopping/shopping.vue
pages/mine/mine.vue
utils/storage.js
```

原来的 `wxml / wxss / js` 文件保留在仓库中作为迁移前参考，真正运行 uni-app 时使用的是 `.vue` 文件和 `pages.json`。

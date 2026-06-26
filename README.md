# 微信小程序示例项目

这是一个原生微信小程序项目，主题是“健康饮食助手”。

## 功能

- 首页展示今日饮食建议
- 食材页查看常见食材和营养说明
- 购物清单页添加、勾选、删除食材
- 我的页查看项目说明和本地数据操作

## 本地运行

1. 使用微信开发者工具打开本仓库根目录。
2. 如果没有正式 AppID，可以使用测试号或游客模式。
3. 编译运行小程序。

## Codespaces / Node 检查

这个仓库无法在 Codespaces 中真正运行微信小程序界面，因为微信小程序需要微信开发者工具运行。

但可以在 Codespaces 中执行基础检查：

```bash
npm run check
```

该命令会检查：

- JSON 文件格式是否正确
- JS 文件语法是否正确
- 小程序关键文件是否存在

## 项目结构

```text
app.js
app.json
app.wxss
project.config.json
sitemap.json
pages/
  index/
  foods/
  shopping/
  mine/
utils/
  storage.js
scripts/
  validate.js
```

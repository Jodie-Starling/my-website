# 项目文件说明 (精简版)

仅保留当前实际使用的文件，去除空占位与未启用的 Tailwind / PostCSS 配置。

## 根目录
- package.json: 脚本与依赖（已移除未使用的 tailwind 相关）
- pnpm-lock.yaml: 依赖锁定
- tsconfig.json: TypeScript 编译配置
- eslint.config.mjs: ESLint 规则
- next.config.ts: Next.js 配置（当前为空，可按需扩展）
- README.md: 项目总体介绍
- public/*.svg: 静态资源

## src/app
- layout.tsx: 全局布局 + MUI Provider + metadata
- globals.scss: 全局基础样式（字体 / 背景 / 表单字号）
- page.tsx: 根路径重定向到 /weather
- api/weather/route.ts: 服务端 API 路由，代理 OpenWeather 当前天气
- weather/page.tsx: 城市搜索入口页面
- weather/[city]/page.tsx: 动态城市详情页面（客户端请求 /api/weather）

## src/providers
- MuiProvider.tsx: 封装 MUI 主题与 App Router 缓存 Provider

## src/store
- useWeatherStore.ts: 使用 Zustand 记录最近查询城市名

## 已删除内容
- src/components/Counter.tsx: 空文件，无实际用途
- src/store/useCounter.ts: 空文件，无实际用途
- postcss.config.mjs + tailwind 依赖: 未使用 Tailwind，统一移除

## 可选后续
- 如需 UI 原子化，可重新引入 Tailwind，并恢复 PostCSS 配置
- 增加错误 / loading 组件 (error.tsx / loading.tsx)
- 增加多城市收藏、历史查询缓存


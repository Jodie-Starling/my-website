## 天气预报应用 (Next.js + MUI)

基于 Next.js App Router + MUI + OpenWeather API 的城市天气查询示例（已精简：移除未用状态 store、SVG 资源与 Tailwind 相关配置）。

### 功能概览
- 城市搜索与跳转 `/weather/[city]`
- 服务端代理 OpenWeather (`/api/weather`)
- MUI 主题 & 全局样式
- 简单缓存策略（上游 5 分钟 revalidate，客户端 60s）

### 快速开始
1. 复制 `.env.example` → `.env.local` 并设置：
	```
	OPENWEATHER_API_KEY=你的Key
	```
2. 安装 & 启动：
	```bash
	pnpm install
	pnpm dev
	```
3. 访问 http://localhost:3000 （自动跳转到 /weather）

### API 示例
`GET /api/weather?city=beijing` 返回：`city, temperature, humidity, description, icon`

### 部署提示
- 在 Vercel/服务器配置 `OPENWEATHER_API_KEY`
- 不要提交 `.env.local`

### 目录与文件作用
根目录：
- package.json: 脚本与依赖
- tsconfig.json: TypeScript 配置
- eslint.config.mjs: ESLint 规则
- next.config.ts: Next.js 配置占位
- .gitignore: 忽略规则（包含 .env*）

public/: (已清空未用 SVG，可按需放置 favicon 等资源)

src/app/
- layout.tsx: 全局 html/body + MUI Provider + metadata
- globals.scss: 全局基础样式
- page.tsx: 根路径重定向到 /weather
- api/weather/route.ts: 服务端 API 代理 OpenWeather
- weather/page.tsx: 搜索入口页面
- weather/[city]/page.tsx: 动态城市详情（客户端 fetch）

src/providers/
- MuiProvider.tsx: 封装 MUI 主题与缓存 Provider

（已删除）src/store/useWeatherStore.ts: 未实际使用的 Zustand store
（已删除）public/*.svg: 未引用静态图标
（已删除）FILES.md: 说明合并进 README

### 可扩展方向（后续可加）
- 5 日 / 小时预报
- 缓存与离线（Redis / Edge）
- 国际化 (i18n)
- 错误与 Loading 组件

---
本仓库演示最小功能，可按需继续扩展。

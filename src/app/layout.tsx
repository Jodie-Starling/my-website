// 根布局：
// 1. 引入全局样式
// 2. 提供全局 <html>/<body> 结构
// 3. 挂载全局 UI Provider (MUI 主题)
// 4. 定义全站 metadata
import "./globals.scss";
import MuiProvider from "@/providers/MuiProvider";

export const metadata = { title: "天气预报", description: "基于 OpenWeather 的城市天气查询" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
// 根路径页面：立即重定向到 /weather
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/weather");
}
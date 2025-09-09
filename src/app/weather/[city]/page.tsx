"use client"; // 动态城市天气详情页面：客户端获取数据
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

interface WeatherResult {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  icon?: string;
  error?: string;
}

// /weather/[city]
export default function CityWeatherPage() {
  const { city } = useParams<{ city: string }>();
  const [data, setData] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      .then(r => r.json())
      .then(j => setData(j))
      .catch(() => setData({ city: decodeURIComponent(city as string), temperature: 0, humidity: 0, description: "请求失败", error: "请求失败" }))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  if (!data || (data as any).error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5" gutterBottom>未找到城市：{decodeURIComponent(city as string)}</Typography>
        <Typography color="text.secondary">请返回重新搜索。</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h4" gutterBottom>{data.city} 天气</Typography>
        <Typography>温度：{data.temperature} °C</Typography>
        <Typography>湿度：{data.humidity}%</Typography>
        <Typography>天气：{data.description}</Typography>
      </Paper>
    </Box>
  );
}

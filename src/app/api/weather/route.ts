import { NextResponse } from 'next/server';

// Weather API Route: /api/weather?city=xxx
// 从 OpenWeatherMap 拉取指定城市当前天气，使用环境变量中的 API KEY。
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = (searchParams.get('city') || 'Beijing').trim();
    if (!city) return NextResponse.json({ error: '缺少城市参数' }, { status: 400 });

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: '缺少服务器端 API Key 配置' }, { status: 500 });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=zh_cn`;
    const response = await fetch(apiUrl, { next: { revalidate: 300 } }); // 5 分钟缓存
    if (!response.ok) {
      return NextResponse.json({ error: '城市不存在或 API 请求失败' }, { status: 404 });
    }

    const data = await response.json();
    const result = {
      city: data.name,
      temperature: data.main?.temp,
      humidity: data.main?.humidity,
      description: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
    };
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, max-age=60' } });
  } catch (err) {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
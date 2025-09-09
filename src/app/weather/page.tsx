"use client"; // 客户端组件：包含输入交互与导航
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

// /weather 入口：搜索城市后跳转到 /weather/[city]
export default function WeatherHome() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const submit = () => {
    if (!city.trim()) return;
    router.push(`/weather/${encodeURIComponent(city.trim())}`);
  };

  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>城市天气查询</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <TextField
          label="城市 (拼音或英文)"
          size="small"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <Button variant="contained" disabled={!city.trim()} onClick={submit}>查询</Button>
      </Stack>
      <Typography variant="body2" mt={2} color="text.secondary">示例：beijing, shanghai, zhengzhou</Typography>
    </Box>
  );
}
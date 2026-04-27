import { NextResponse } from 'next/server';

// Maps time-of-day labels to target hour strings used in OpenWeatherMap dt_txt
const TIME_TARGETS = {
  morning: '09:00:00',
  afternoon: '15:00:00',
  evening: '18:00:00',
  tonight: '21:00:00',
};

// Return the forecast entry whose dt_txt matches the requested time-of-day
export async function GET(request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const time = request.nextUrl.searchParams.get('time') ?? 'morning';
  const targetTime = TIME_TARGETS[time] ?? '09:00:00';

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=Toronto&units=metric&appid=${apiKey}`
  );
  const data = await res.json();

  // Find entry whose dt_txt ends with the target time string
  const entry =
    data.list.find((item) => item.dt_txt.endsWith(targetTime)) ?? data.list[0];

  // Shape response to match /api/weather so components need no changes
  return NextResponse.json({
    main: entry.main,
    weather: entry.weather,
    wind: entry.wind,
    name: 'Toronto',
  });
}

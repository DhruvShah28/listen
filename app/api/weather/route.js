import { NextResponse } from 'next/server';

// Fetch Toronto weather from OpenWeatherMap — API key stays server-side only
export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=${apiKey}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}

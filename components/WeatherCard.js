// Full weather card — condition and details first, min/max temp at bottom
export default function WeatherCard({ data }) {
  const { feels_like, humidity, temp_min, temp_max } = data.main;
  const condition = data.weather[0].description;
  const wind = data.wind.speed;
  const city = data.name;

  return (
    <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 capitalize">{city} Weather</h2>
      <ul className="space-y-3 text-gray-300">
        <li className="flex justify-between">
          <span>Condition</span>
          <span className="text-white font-semibold capitalize">{condition}</span>
        </li>
        <li className="flex justify-between">
          <span>Wind Speed</span>
          <span className="text-white font-semibold">{wind} m/s</span>
        </li>
        <li className="flex justify-between">
          <span>Humidity</span>
          <span className="text-white font-semibold">{humidity}%</span>
        </li>
        <li className="flex justify-between">
          <span>Feels Like</span>
          <span className="text-white font-semibold">{feels_like}°C</span>
        </li>
        <li className="flex justify-between border-t border-gray-700 pt-3 mt-1">
          <span>Min Temp</span>
          <span className="text-white font-semibold">{temp_min}°C</span>
        </li>
        <li className="flex justify-between">
          <span>Max Temp</span>
          <span className="text-white font-semibold">{temp_max}°C</span>
        </li>
      </ul>
    </div>
  );
}

// Minimal card — shows only the current temperature in large text
export default function TemperatureCard({ temp, city }) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl p-10 shadow-xl text-center w-full max-w-xs">
      <p className="text-gray-400 text-sm mb-2 uppercase tracking-widest">{city}</p>
      <p className="text-8xl font-bold">{temp}°</p>
      <p className="text-gray-400 text-sm mt-3">Celsius</p>
    </div>
  );
}

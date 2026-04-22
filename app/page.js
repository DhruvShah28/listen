'use client';

import { useState, useEffect, useRef } from 'react';
import MicButton from '../components/MicButton';
import WeatherCard from '../components/WeatherCard';
import TemperatureCard from '../components/TemperatureCard';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cardMode, setCardMode] = useState(null); // 'full' | 'temp' | null
  const recognitionRef = useRef(null);

  // Initialize speech recognition once on mount — browser-only API requires client component
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Route spoken keywords to the correct action
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      setTranscript(spoken);

      if (spoken.includes('weather')) {
        fetchWeather('full');
      } else if (spoken.includes('temperature')) {
        fetchWeather('temp');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // Reset recording state when recognition ends naturally
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
  }, []);

  // Call our server-side route — API key is never exposed to the browser
  async function fetchWeather(mode) {
    setCardMode(mode);
    const res = await fetch('/api/weather');
    const data = await res.json();
    setWeatherData(data);
  }

  // Start listening — clear previous results first
  function handleStart() {
    setTranscript('');
    setWeatherData(null);
    setCardMode(null);
    recognitionRef.current?.start();
    setIsRecording(true);
  }

  // Stop listening manually
  function handleStop() {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen px-4 py-20 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">Listen</h1>
        <p className="text-gray-500 text-sm mt-2">Say "weather" or "temperature"</p>
      </div>

      <MicButton isRecording={isRecording} onStart={handleStart} onStop={handleStop} />

      {/* Show what was spoken */}
      {transcript && (
        <p className="text-gray-400 text-sm italic">"{transcript}"</p>
      )}

      {/* Render card based on which keyword was detected */}
      {cardMode === 'full' && weatherData && <WeatherCard data={weatherData} />}
      {cardMode === 'temp' && weatherData && (
        <TemperatureCard temp={weatherData.main.temp} city={weatherData.name} />
      )}
    </main>
  );
}

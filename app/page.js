'use client';

import { useState, useEffect, useRef } from 'react';
import { Intent } from '../lib/intent';
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

    // Parse transcript into intent and execute the correct query
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase();
      setTranscript(spoken);
      const intent = new Intent(spoken);
      executeQuery(intent);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // Reset recording state when recognition ends naturally
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
  }, []);

  // Single entry point for all queries — routes to correct API and card based on intent
  async function executeQuery(intent) {
    if (!intent.type) return;

    // Determine which card to show
    const mode = intent.type === 'weather' ? 'full' : 'temp';
    setCardMode(mode);

    // Use forecast endpoint for time-of-day queries, current weather otherwise
    const endpoint =
      intent.timeContext === 'now'
        ? '/api/weather'
        : `/api/forecast?time=${intent.timeContext}`;

    const res = await fetch(endpoint);
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
        <p className="text-gray-500 text-sm mt-2">
          Say "weather" or "temperature" — add morning, afternoon, evening, or tonight
        </p>
      </div>

      <MicButton isRecording={isRecording} onStart={handleStart} onStop={handleStop} />

      {/* Show what was spoken */}
      {transcript && (
        <p className="text-gray-400 text-sm italic">"{transcript}"</p>
      )}

      {/* Render card based on detected intent */}
      {cardMode === 'full' && weatherData && <WeatherCard data={weatherData} />}
      {cardMode === 'temp' && weatherData && (
        <TemperatureCard temp={weatherData.main.temp} city={weatherData.name} />
      )}
    </main>
  );
}

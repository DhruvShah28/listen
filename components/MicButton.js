// Mic button — switches between idle and recording visual states
export default function MicButton({ isRecording, onStart, onStop }) {
  return (
    <button
      onClick={isRecording ? onStop : onStart}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      className={`rounded-full p-6 transition-all duration-300 focus:outline-none ${
        isRecording
          ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-400 ring-offset-2 ring-offset-gray-950'
          : 'bg-gray-700 text-white hover:bg-gray-600 active:scale-95'
      }`}
    >
      {/* Microphone SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    </button>
  );
}

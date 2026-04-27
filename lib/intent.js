// Parses a voice transcript into a structured intent with type and time context
export class Intent {
  constructor(transcript) {
    this.type = this.#parseType(transcript);
    this.timeContext = this.#parseTime(transcript);
  }

  // Detect query type from keyword presence
  #parseType(text) {
    if (text.includes('weather')) return 'weather';
    if (text.includes('temperature')) return 'temperature';
    return null;
  }

  // Extract time-of-day context — 'tonight' checked before 'evening' (more specific)
  #parseTime(text) {
    if (text.includes('tonight')) return 'tonight';
    if (text.includes('afternoon')) return 'afternoon';
    if (text.includes('evening')) return 'evening';
    if (text.includes('morning')) return 'morning';
    return 'now';
  }
}

@AGENTS.md

# Listen — Project Rules

## Architecture
- `app/page.js` is the single client entry point — all voice logic and state lives here
- `lib/` holds pure utility classes — no React, no fetch calls
- `components/` holds presentational components only — no data fetching, no side effects
- `app/api/` holds route handlers — one file per responsibility

## Intent Flow (how voice input becomes a result)
Voice transcript → `new Intent(spoken)` in `lib/intent.js` → `executeQuery(intent)` in `page.js`
- All keyword-matching logic lives exclusively in `lib/intent.js`
- `executeQuery` is the only function that calls `fetch` in `page.js`
- To add a new intent type: add a keyword to `#parseType`, handle the new type in `executeQuery`

## API Routes
- API key (`OPENWEATHER_API_KEY`) must never leave server-side route handlers
- `/api/weather` — current conditions, no params
- `/api/forecast?time=morning|afternoon|evening|tonight` — time-of-day forecast
- All routes hardcoded to Toronto — add `?city=` param if city becomes dynamic

## Components
- `WeatherCard` receives full API response as `data` prop — do not destructure at call site
- `TemperatureCard` receives `temp` (number) and `city` (string) as separate props
- WeatherCard display order: condition, wind, humidity, feels_like, then temp_min/temp_max at bottom

## Code Style
- JavaScript only — no TypeScript in app/, components/, or lib/
- Short one-line comment on every function describing what it does
- Named exports from lib/ — no default exports

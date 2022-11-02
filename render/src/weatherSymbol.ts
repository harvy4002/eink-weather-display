import * as fs from 'fs'
import * as path from 'path'

export type WeatherSymbolNumber = keyof typeof weatherSymbolIcons['light']

export function getSymbolIcon(
  symbol: WeatherSymbolNumber,
  theme: 'light' | 'dark'
): string {
  if (!(symbol in weatherSymbolIcons[theme])) {
    throw new Error(`Weather symbol not found for number: ${symbol} (${theme})`)
  }

  return `weather-icons/${weatherSymbolIcons[theme][symbol]}.svg`
}

export function getSymbolClass(
  symbol: WeatherSymbolNumber,
  theme: 'light' | 'dark'
): string {
  if (!(symbol in weatherSymbolIcons[theme])) {
    throw new Error(`Weather symbol not found for number: ${symbol} (${theme})`)
  }

  return weatherSymbolIcons[theme][symbol]
}

export function meteoToFmiWeatherSymbolNumber(
  meteoCode: MeteoWeatherCode
): WeatherSymbolNumber {
  return meteoCodesToFmi[meteoCode]
}

export const weatherSymbolIcons = {
  light: {
    1: 'wi-day-sunny', // 'Clear',
    2: 'wi-day-cloudy', // 'Partly cloudy',
    3: 'wi-cloudy', // 'Cloudy',
    21: 'wi-day-showers', // 'Scattered showers',
    22: 'wi-showers', // 'Showers',
    23: 'wi-rain-mix', // 'Heavy showers',
    31: 'wi-day-sprinkle', // 'Light showers',
    32: 'wi-day-rain', // 'Moderate rain',
    33: 'wi-rain', // 'Heavy rain',
    41: 'wi-day-snow', // 'Light snow showers',
    42: 'wi-day-snow', // 'Snow showers',
    43: 'wi-day-snow-wind', // 'Heavy snow showers',
    51: 'wi-day-snow', // 'Light snowfall',
    52: 'wi-day-snow', // 'Moderate snowfall',
    53: 'wi-day-snow', // 'Heavy snowfall',
    61: 'wi-day-storm-showers', // 'Thundershowers',
    62: 'wi-day-storm-showers', // 'Heavy thundershowers',
    63: 'wi-day-lightning', // 'Thunder',
    64: 'wi-day-thunderstorm', // 'Heavy thunder',
    71: 'wi-day-sleet', // 'Light sleet showers',
    72: 'wi-day-sleet', // 'Moderate sleet showers',
    73: 'wi-day-rain-mix', // 'Heavy sleet showers',
    81: 'wi-day-sleet', // 'Light sleet',
    82: 'wi-day-sleet', // 'Moderate sleet',
    83: 'wi-sleet', // 'Heavy sleet',
    91: 'wi-day-haze', // 'Mist',
    92: 'wi-fog', // 'Fog',
  },
  dark: {
    1: 'wi-night-clear', // 'Clear',
    2: 'wi-night-alt-cloudy', // 'Partly cloudy',
    3: 'wi-cloudy', // 'Cloudy',
    21: 'wi-night-alt-showers', // 'Scattered showers',
    22: 'wi-showers', // 'Showers',
    23: 'wi-rain-mix', // 'Heavy showers',
    31: 'wi-night-alt-sprinkle', // 'Light showers',
    32: 'wi-night-alt-rain', // 'Moderate rain',
    33: 'wi-rain', // 'Heavy rain',
    41: 'wi-night-alt-snow', // 'Light snow showers',
    42: 'wi-night-alt-snow', // 'Snow showers',
    43: 'wi-night-alt-snow-wind', // 'Heavy snow showers',
    51: 'wi-night-alt-snow', // 'Light snowfall',
    52: 'wi-night-alt-snow', // 'Moderate snowfall',
    53: 'wi-night-alt-snow', // 'Heavy snowfall',
    61: 'wi-night-alt-storm-showers', // 'Thundershowers',
    62: 'wi-night-alt-storm-showers', // 'Heavy thundershowers',
    63: 'wi-night-alt-lightning', // 'Thunder',
    64: 'wi-night-alt-thunderstorm', // 'Heavy thunder',
    71: 'wi-night-alt-sleet', // 'Light sleet showers',
    72: 'wi-night-alt-sleet', // 'Moderate sleet showers',
    73: 'wi-night-alt-rain-mix', // 'Heavy sleet showers',
    81: 'wi-night-alt-sleet', // 'Light sleet',
    82: 'wi-night-alt-sleet', // 'Moderate sleet',
    83: 'wi-sleet', // 'Heavy sleet',
    91: 'wi-dust', // 'Mist',
    92: 'wi-fog', // 'Fog',
  },
}

export const weatherSymbolDescriptions = {
  1: 'Clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  21: 'Scattered showers',
  22: 'Showers',
  23: 'Heavy showers',
  31: 'Light showers',
  32: 'Moderate rain',
  33: 'Heavy rain',
  41: 'Light snow showers',
  42: 'Snow showers',
  43: 'Heavy snow showers',
  51: 'Light snowfall',
  52: 'Moderate snowfall',
  53: 'Heavy snowfall',
  61: 'Thundershowers',
  62: 'Heavy thundershowers',
  63: 'Thunder',
  64: 'Heavy thunder',
  71: 'Light sleet showers',
  72: 'Moderate sleet showers',
  73: 'Heavy sleet showers',
  81: 'Light sleet',
  82: 'Moderate sleet',
  83: 'Heavy sleet',
  91: 'Mist',
  92: 'Fog',
}

const meteoCodesToFmi = {
  0: 1, // Clear sky (the comment refers to the the key, which is the meteo code)
  1: 2, // Mainly clear
  2: 2, // Partly cloudy
  3: 2, // Overcast
  45: 92, // Fog
  48: 92, // Depositing rime fog
  51: 31, // Drizzle: Light
  53: 22, // Drizzle: moderate
  55: 23, // Drizzle: dense intensity
  56: 71, // Freezing Drizzle: Light
  57: 73, // Freezing Drizzle: dense intensity
  61: 31, // Rain: Slight
  63: 32, // Rain: moderate
  65: 33, // Rain: heavy intensity
  66: 31, // Freezing Rain: Light
  67: 23, // Freezing Rain: heavy intensity
  71: 51, // Snow fall: Slight
  73: 52, // Snow fall: moderate
  75: 53, // Snow fall: heavy intensity
  77: 42, // Snow grains
  80: 31, // Rain showers: Slight
  81: 22, // Rain showers: moderate
  82: 23, // Rain showers: violent
  85: 42, // Snow showers: slight
  86: 43, // Snow showers: heavy
  95: 61, // Thunderstorm: Slight or moderate
  96: 63, // Thunderstorm with slight hail
  99: 63, // Thunderstorm with heavy hail
} as const
export type MeteoWeatherCode = keyof typeof meteoCodesToFmi

// Validations

Object.keys(weatherSymbolDescriptions).forEach((symbol) => {
  if (!(symbol in weatherSymbolIcons['light'])) {
    throw new Error(`${symbol} missing from light weather icons object`)
  }
  if (!(symbol in weatherSymbolIcons['dark'])) {
    throw new Error(`${symbol} missing from dark weather icons object`)
  }
})

Object.keys(weatherSymbolIcons['light']).forEach((symbol: any) => {
  const icon = weatherSymbolIcons['light'][symbol as WeatherSymbolNumber]
  if (
    !fs.existsSync(
      path.join(__dirname, 'templates/weather-icons/', `${icon}.svg`)
    )
  ) {
    throw new Error(`${icon}.svg not found from weather-icons/ directory`)
  }
})

Object.keys(weatherSymbolIcons['dark']).forEach((symbol: any) => {
  const icon = weatherSymbolIcons['dark'][symbol as WeatherSymbolNumber]
  if (
    !fs.existsSync(
      path.join(__dirname, 'templates/weather-icons/', `${icon}.svg`)
    )
  ) {
    throw new Error(`${icon}.svg not found from weather-icons/ directory`)
  }
})
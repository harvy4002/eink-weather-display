import { meteoCodesToFmi, weatherSymbolIcons } from 'src/weather/weatherSymbol'

export type Coordinate = {
  lat: number
  lon: number
}

export type MaxUvIndex = {
  value: number
  time: Date
}

export type WeatherSymbolNumber = keyof typeof weatherSymbolIcons['light']
export type MeteoWeatherCode = keyof typeof meteoCodesToFmi

export type WeatherTodaySummary = {
  avgTemperature: number
  minTemperature: number
  maxTemperature: number
  avgWindSpeedMs: number
  minWindSpeedMs: number
  maxWindSpeedMs: number
  symbol: WeatherSymbolNumber
  description: string
  sunrise: Date
  sunset: Date
  dayDurationInSeconds: number
  maxUvIndex: MaxUvIndex
  precipitationAmount: number | null
}

// All numbers should be nullable to treat NaN returned by FMI API in type-safe manner...
// ...but that's a bit more work.
export type ShortTermWeatherDataPoint = {
  time: Date
  temperature: number
  windSpeedMs: number
  windGustMs: number
  pressure: number
  precipitationAmountFromNowToNext: number | null
  precipitation1h: number
  dewPoint: number
  symbol: WeatherSymbolNumber
}

export type LongTermWeatherDataPoint = {
  time: Date
  avgTemperature: number
  minTemperature: number
  maxTemperature: number
  avgWindSpeedMs: number
  minWindSpeedMs: number
  maxWindSpeedMs: number
  precipitationAmountFromNowToNext: number | null
  symbol: WeatherSymbolNumber
}

export type LocalWeather = {
  todaySummary: WeatherTodaySummary
  forecastShortTerm: ShortTermWeatherDataPoint[]
  forecastLongTerm: LongTermWeatherDataPoint[]
}
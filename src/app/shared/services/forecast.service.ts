import {Injectable} from "@angular/core";
import { fetchWeatherApi } from 'openmeteo';
import {DayForecast} from "../components/forecast-card/forecast-card.component";

@Injectable({
  providedIn: 'root',
})

export class ForecastService {
  URL = 'https://api.open-meteo.com/v1/forecast';

  async fetchForecastData(lat: number, long: number) {
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const params = {
      "latitude": lat,
      "longitude": long,
      "hourly": "temperature_2m",
      "daily": ["temperature_2m_max", "temperature_2m_min"]
    };

    const data = await fetchWeatherApi(this.URL, params);
    const response = data[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;
    const weatherData = {
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
      },
    };

    const forecastList: DayForecast[] = [];

    for (let i = 0; i < weatherData.daily.time.length; i++) {
      forecastList.push({
        date: weatherData.daily.time[i],
        highTemp: Math.round(weatherData.daily.temperature2mMax[i]),
        lowTemp: Math.round(weatherData.daily.temperature2mMin[i])
      });
    }

    return forecastList;
  }
}

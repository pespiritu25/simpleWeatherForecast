import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { DayForecast } from '../components/forecast-card/forecast-card.component';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  URL = 'https://api.open-meteo.com/v1/forecast';

  // TODO: Add timezone for correct display of time of day image, cant figure out why is_day always return 0
  async fetchForecastData(lat: number, long: number) {
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const params = {
      latitude: lat,
      longitude: long,
      current: ['temperature_2m', 'apparent_temperature'],
      daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'sunrise', 'sunset'],
    };

    const data = await fetchWeatherApi(this.URL, params);
    const response = data[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;

    const weatherData = {
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000),
        ),
        weatherCode: daily.variables(0)!.valuesArray()!,
        temperature2mMax: daily.variables(1)!.valuesArray()!,
        temperature2mMin: daily.variables(2)!.valuesArray()!,
      },
    };

    const forecastList: DayForecast[] = [];

    for (let i = 0; i < weatherData.daily.time.length; i++) {
      forecastList.push({
        date: weatherData.daily.time[i],
        highTemp: Math.round(weatherData.daily.temperature2mMax[i]),
        lowTemp: Math.round(weatherData.daily.temperature2mMin[i]),
        weatherCode: weatherData.daily.weatherCode[i],
      });
    }

    console.log(forecastList);
    return forecastList;
  }

  async fetchCurrentForecastData(lat: number, long: number, name: string) {
    const params = {
      latitude: lat,
      longitude: long,
      current: 'temperature_2m',
      timezone: 'auto',
    };

    const responses = await fetchWeatherApi(this.URL, params);
    const response = responses[0];
    const current = response.current()!;
    const utcOffsetSeconds = response.utcOffsetSeconds();

    return {
      locationName: name,
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temp: Math.round(current.variables(0)!.value()),
    };
  }
}

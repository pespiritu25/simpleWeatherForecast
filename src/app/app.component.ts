import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LocationSelectComponent} from "./shared/components/location-select/location-select.component";
import {DayForecast, ForecastCardComponent} from "./shared/components/forecast-card/forecast-card.component";
import {ForecastListComponent} from "./shared/components/forecast-list/forecast-list.component";
import {ForecastService} from "./shared/services/forecast.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationSelectComponent, ForecastCardComponent, ForecastListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-weather-forecast';

  locations = [
    {
      lat: 43.0896,
      long: 79.0849,
      name: 'Niagara Falls, ON'
    },
    {
      lat: 43.6532,
      long: 79.3832,
      name: 'Toronto, ON'
    },
    {
      lat: 45.5019,
      long: 73.5674,
      name: 'Montréal, QC'
    },
    {
      lat: 50.4452,
      long: 104.6189,
      name: 'Regina, SK'
    },
    {
      lat: 48.4284,
      long: 123.3656,
      name: 'Victoria, BC'
    },
    {
      lat: 49.8954,
      long: 97.1385,
      name: 'Winnepeg, MB'
    },
    {
      lat: 53.5461,
      long: 113.4937,
      name: 'Edmonton, AB'
    },
  ];

  forecasts: DayForecast[] = [];

  constructor(private forecastService: ForecastService) {}

  generateForecast(lat: number, long: number) {
    this.forecastService.fetchForecastData(lat, long)
      .then((data) => {
        this.forecasts = data;
    });
  }
}

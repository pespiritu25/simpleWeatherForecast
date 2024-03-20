import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LocationLatLong, LocationSelectComponent} from "./shared/components/location-select/location-select.component";
import {DayForecast, ForecastCardComponent} from "./shared/components/forecast-card/forecast-card.component";
import {ForecastListComponent} from "./shared/components/forecast-list/forecast-list.component";
import {ForecastService} from "./shared/services/forecast.service";
import {MatIcon} from "@angular/material/icon";
import {TimeOfDayImageComponent} from "./shared/components/time-of-day-image/time-of-day-image.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationSelectComponent, ForecastCardComponent, ForecastListComponent, MatIcon, TimeOfDayImageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-weather-forecast';

  locations: LocationLatLong[] = [
    {
      lat: 43.0896,
      long: 79.0849,
      name: 'Niagara Falls, ON',
    },
    {
      lat: 43.6532,
      long: 79.3832,
      name: 'Toronto, ON',
    },
    {
      lat: 45.5019,
      long: 73.5674,
      name: 'Montréal, QC',
    },
    {
      lat: 50.4452,
      long: 104.6189,
      name: 'Regina, SK',
    },
    {
      lat: 48.4284,
      long: 123.3656,
      name: 'Victoria, BC',
    },
    {
      lat: 49.8954,
      long: 97.1385,
      name: 'Winnepeg, MB',
    },
    {
      lat: 53.5461,
      long: 113.4937,
      name: 'Edmonton, AB',
    },
    {
      lat: 14.2691,
      long: 121.4113,
      name: 'Laguna, PH',
    },
  ];

  forecasts: DayForecast[] = [];

  current: any = null;

  constructor(private forecastService: ForecastService) {}

  generateForecast(event: LocationLatLong) {
    this.forecastService.fetchForecastData(event.lat, event.long)
      .then((data) => {
        this.forecasts = data;
    });

    this.forecastService.fetchCurrentForecastData(event.lat, event.long, event.name)
      .then((data) => {
        this.current = data;
      });
  }
}

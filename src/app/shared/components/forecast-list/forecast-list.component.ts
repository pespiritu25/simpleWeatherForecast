import { Component, Input } from '@angular/core';
import { DayForecast, ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [ForecastCardComponent, NgForOf],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.scss',
})
export class ForecastListComponent {
  @Input() list: DayForecast[] = [];
}

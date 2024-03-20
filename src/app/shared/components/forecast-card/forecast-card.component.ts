import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {DatePipe} from "@angular/common";

export interface DayForecast {
  date: Date,
  highTemp: number,
  lowTemp: number,
}

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatChip,
    MatChipsModule,
    MatIcon,
    MatCardContent,
    DatePipe,
  ],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
  @Input() forecast: DayForecast;
}

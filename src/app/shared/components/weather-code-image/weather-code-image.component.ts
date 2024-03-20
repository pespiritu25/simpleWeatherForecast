import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-code-image',
  standalone: true,
  imports: [],
  templateUrl: './weather-code-image.component.html',
  styleUrl: './weather-code-image.component.scss',
})
export class WeatherCodeImageComponent {
  weatherCodeImage = '';

  _code: number;
  get code(): number {
    return this._code;
  }

  @Input() set code(value: number) {
    console.log(value);
    this._code = value;
    this.weatherCodeImage = this.generateImage(value);
  }

  constructor() {}
  generateImage(code: number, index = 0) {
    const codeName = ['clear', 'cloudy', 'foggy', 'rain', 'snow', 'thunderstorm'];

    const codeIndex = [
      [0], //clear
      [1, 2, 3], // cloudy
      [45, 48], // fog
      [51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 85, 86], // rain
      [66, 67, 71, 73, 75, 77], // snow
      [82, 95, 96, 99], // thunderstorm
    ];

    if (codeIndex[index].includes(code)) {
      return `${codeName[index]}.png`;
    } else {
      return this.generateImage(code, index + 1);
    }
  }
}

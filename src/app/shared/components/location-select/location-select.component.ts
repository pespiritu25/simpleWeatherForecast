import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

interface LocationLatLong {
  lat: number;
  long: number;
  name: string;
}

@Component({
  selector: 'app-location-select',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormField,
    MatSelect,
    CommonModule,
    MatOption
  ],
  templateUrl: './location-select.component.html',
  styleUrl: './location-select.component.scss'
})
export class LocationSelectComponent {
  selectedOption: LocationLatLong;

  _list: LocationLatLong[];
  get list(): LocationLatLong[] {
    return this._list;
  }
  @Input() set list(value: LocationLatLong[]) {
    this._list = value;
    this.changeOption(value[0]);
  };

  @Output() selected: EventEmitter<LocationLatLong> = new EventEmitter<LocationLatLong>();

  changeOption(value: LocationLatLong) {
    this.selectedOption = value;
    this.selected.emit(this.selectedOption);
  }
}

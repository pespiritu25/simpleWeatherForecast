import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCodeImageComponent } from './weather-code-image.component';

describe('WeatherCodeImageComponent', () => {
  let component: WeatherCodeImageComponent;
  let fixture: ComponentFixture<WeatherCodeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCodeImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCodeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

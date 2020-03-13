import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { UiService } from "@app/services/ui.service";
import { WeatherService } from "@app/services/weather.service";

@Component({
  selector: "weather-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() city: string = "Paris";
  @Output() cityStored = new EventEmitter();

  citesWeather: Object;
  darkMode: boolean;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
  cityName = "";

  private themeSubs: Subscription;

  constructor(
    public router: Router,
    public uiService: UiService,
    public weather: WeatherService
  ) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe(isDark => {
      this.darkMode = isDark;
    });

    this.loadCity(this.city);
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }

  openDetails() {}

  // ---
  private loadCity(city: string) {
    if (!city) {
      console.log(`Cidade não informada: ${city}`);
      return;
    }

    this.weather
      .getWeather(city)
      .pipe(first())
      .subscribe(
        payload => {
          this.cityName = city;
          this.state = payload.weather[0].main;
          this.temp = Math.ceil(payload.main.temp);
        },
        err => {
          console.log(`ERRO: ${err.error.message}`);
        }
      );

    this.weather
      .getForecast(city)
      .pipe(first())
      .subscribe(
        payload => {
          this.maxTemp = Math.round(payload[0].main.temp);
          this.minTemp = Math.round(payload[0].main.temp);
          for (const res of payload) {
            if (
              new Date().toLocaleDateString("pt-BR") ===
              new Date(res.dt_txt).toLocaleDateString("pt-BR")
            ) {
              this.maxTemp =
                res.main.temp > this.maxTemp
                  ? Math.round(res.main.temp)
                  : this.maxTemp;
              this.minTemp =
                res.main.temp < this.minTemp
                  ? Math.round(res.main.temp)
                  : this.minTemp;
            }
          }
        },
        err => {
          console.log(`ERRO: ${err.error.message}`);
        }
      );
  }
}
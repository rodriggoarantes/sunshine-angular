import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "@components/material/app.module-material";
import { WeatherIconComponent } from "./components/weather-icon/icon.component";
import { CardComponent } from "@components/weather-card/card.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddCardComponent } from "./components/add-card/add-card.component";
import { CityCardComponent } from "./components/city-card/city.card.component";

import { HomeComponent } from "@app/pages/home/home.component";
import { CityAddComponent } from "@app/pages/city/add/city.add.component";
import { ManageComponent } from "@app/pages/city/manage/manage.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    WeatherIconComponent,
    AddCardComponent,
    CityAddComponent,
    CityCardComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

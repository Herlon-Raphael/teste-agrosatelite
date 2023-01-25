import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasemapComponent } from './basemap/basemap.component';
import { FarmComponent } from './farm/farm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http'
import { FarmService } from './services/farm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerFarm } from './registerFarm/registerFarm.component';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { editFarmComponent } from './editFarm/editFarm.componente';
import * as ol from 'openlayers'



@NgModule({
  declarations: [
    AppComponent,
    BasemapComponent,
    FarmComponent,
    DashboardComponent,
    registerFarm,
    DetailsComponent,
    editFarmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
  ],
  providers: [FarmService],
  bootstrap: [AppComponent]
})
export class AppModule { }

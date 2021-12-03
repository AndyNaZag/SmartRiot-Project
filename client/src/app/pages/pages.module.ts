import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

import { ServicesComponent } from './services/services.component';
import { PartialsModule } from '../partials/partials.module';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';


@NgModule({
  imports: [BrowserModule, FormsModule, PartialsModule],
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ServicesComponent,
    OrderstatusComponent,
  ],
  exports: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ServicesComponent,
    PartialsModule]
})
export class PagesModule {}

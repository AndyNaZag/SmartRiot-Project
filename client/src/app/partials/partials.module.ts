import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BasePageComponent } from './base-page/base-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdoptionlistSummaryComponent } from '../pet-store/adoptionlist-summary/adoptionlist-summary.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule],
  declarations: [
    AdoptionlistSummaryComponent,
    BasePageComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    BasePageComponent,
    FooterComponent,
    HeaderComponent
    ]
})
export class PartialsModule {}

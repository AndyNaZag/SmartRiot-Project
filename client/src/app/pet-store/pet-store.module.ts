import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { PetStoreComponent } from '../pet-store/pet-store.component';
import { CounterDirective } from './counter.directive';
import { AdoptionlistDetailComponent } from './adoptionlist-detail/adoptionlist-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
  declarations: [PetStoreComponent, CounterDirective, AdoptionlistDetailComponent, CheckoutComponent],
  exports: [PetStoreComponent, CounterDirective, AdoptionlistDetailComponent, CheckoutComponent]
})
export class PetStoreModule {}
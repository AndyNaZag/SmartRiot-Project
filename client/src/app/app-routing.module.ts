import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { PetStoreComponent } from './pet-store/pet-store.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdoptionlistDetailComponent } from './pet-store/adoptionlist-detail/adoptionlist-detail.component';
import { CheckoutComponent } from './pet-store/checkout/checkout.component';
import { StoreFirstGuard } from './guards/storeFirst.guard';
import { OrderstatusComponent } from './pages/orderstatus/orderstatus.component';

const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Home'}},
 {path: 'login', data: {title: 'Login'}, redirectTo: '/admin/auth', pathMatch: 'full'},

 {path: 'about', component: AboutComponent, data: {title: 'About'}},
 {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
 {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},
 {path: 'orderstatus', component: OrderstatusComponent, data: {title: 'Order Status'}},

 {path: 'pet-list', component: PetStoreComponent, data: { title: 'Pet Store'}, canActivate: [StoreFirstGuard]},
 {path: 'adoptionlist', component: AdoptionlistDetailComponent, data: { title: 'Shopping Adoptionlist'}, canActivate: [StoreFirstGuard]},
 {path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'}, canActivate: [StoreFirstGuard]},
 {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ StoreFirstGuard]
})
export class AppRoutingModule { }

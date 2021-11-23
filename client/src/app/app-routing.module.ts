import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutanimalsComponent } from './pages/aboutanimals/aboutanimals.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { AdoptComponent } from './pages/adopt/adopt.component';
import { ServicesComponent } from './pages/services/services.component';
import { AddorEditComponent } from './pages/addor-edit/addor-edit.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'aboutanimals', component: AboutanimalsComponent, data: {title: 'About Animals'}},
  {path: 'adopt', component: AdoptComponent, data: {title: 'Adopt'}},
  {path: 'services', component: ServicesComponent, data: {title: 'Our Services'}},
  {path: 'aboutus', component: AboutUsComponent, data: {title: 'About Us'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'adopt/:mode/:id', component: AddorEditComponent, data: {title: 'Edit Pet'}},
  {path: 'adopt/:mode', component: AddorEditComponent, data: {title: 'Add Pet'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

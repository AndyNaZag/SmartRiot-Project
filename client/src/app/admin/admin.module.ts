import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { PetEditorComponent } from './pet-editor/pet-editor.component';
import { PetTableComponent } from './pet-table/pet-table.component';


const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
   children: [
      { path: 'pets/:mode/:id', component: PetEditorComponent, data: {title: 'Edit Pet'}, canActivate: [AuthGuard]},
      { path: 'pets/:mode', component: PetEditorComponent, data: {title: 'Add Pet'}, canActivate: [AuthGuard]},
      { path: 'pets', component: PetTableComponent, data: {title: 'Pet Table'}, canActivate: [AuthGuard]},
      { path: 'orders', component: OrderTableComponent, data: {title: 'Order Table'}, canActivate: [AuthGuard]},
      { path: '**', redirectTo: 'pet-list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, AdminComponent, OrderTableComponent, PetEditorComponent, PetTableComponent, PetEditorComponent, PetTableComponent]
})
export class AdminModule {}

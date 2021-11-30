import { NgModule } from '@angular/core';
import { PetRepository} from './pet.repository';
import { StaticDataSource } from './static.datasource';
import { Adoptionlist } from './adoptionlist.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { Order } from './order.model';
import { OrderRepository } from './order.repository';
import { AuthService } from './auth.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [PetRepository, StaticDataSource, Adoptionlist, Order, OrderRepository,
  {provide: StaticDataSource, useClass: RestDataSource},
  RestDataSource, AuthService]
})
export class ModelModule {}

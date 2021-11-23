import { NgModule } from '@angular/core';
import { PetRepository } from './pet.repository';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { PetInfo } from './petdetails.model';


@NgModule({
    
    imports: [HttpClientModule],
    providers: [PetRepository, StaticDataSource, PetInfo, PetRepository, RestDataSource, {provide: StaticDataSource, useClass: RestDataSource}]})
export class ModelModule { }
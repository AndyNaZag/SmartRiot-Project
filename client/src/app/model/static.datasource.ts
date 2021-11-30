import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Observable, from } from 'rxjs';
import { Order } from './order.model';

@Injectable()
export class StaticDataSource
{
  private pets: Pet[] =
  [
    new Pet(1, 'Pet 1', 'Category 1', 'Breed 1', 10, true, 'Short Description', 9.5),
    new Pet(2, 'Pet 2', 'Category 1', 'Breed 2', 10, true, 'Short Description', 9.5),
    new Pet(3, 'Pet 3', 'Category 1', 'Breed 3', 10, true, 'Short Description', 9.5),
    new Pet(4, 'Pet 4', 'Category 1', 'Breed 4', 10, true, 'Short Description', 9.5),
    new Pet(5, 'Pet 5', 'Category 2', 'Breed 6', 10, true, 'Short Description', 9.5),
    new Pet(6, 'Pet 6', 'Category 2', 'Breed 6', 10, true, 'Short Description', 9.5),
    new Pet(7, 'Pet 7', 'Category 2', 'Breed 7', 10, true, 'Short Description', 9.5),
    new Pet(8, 'Pet 8', 'Category 2', 'Breed 8', 10, true, 'Short Description', 9.5),
    new Pet(9, 'Pet 9', 'Category 3', 'Breed 9', 10, true, 'Short Description', 9.5),
    new Pet(10, 'Pet 10', 'Category 3', 'Breed 10', 10, true, 'Short Description', 9.5),
    new Pet(11, 'Pet 11', 'Category 3', 'Breed 11', 10, true, 'Short Description', 9.5),
    new Pet(12, 'Pet 12', 'Category 4', 'Breed 12', 10, true, 'Short Description', 9.5),
    new Pet(13, 'Pet 13', 'Category 4', 'Breed 13', 10, true, 'Short Description', 9.5),
    new Pet(14, 'Pet 14', 'Category 4', 'Breed 14', 10, true, 'Short Description', 9.5),
    new Pet(15, 'Pet 15', 'Category 4', 'Breed 15', 10, true, 'Short Description', 9.5),
  ];

  getPets(): Observable<Pet[]>
  {
    return from([this.pets]);
  }

  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return from ([order]);
  }
}

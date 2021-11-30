import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class PetRepository
{
  private pets: Pet[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getPets().subscribe(data => {
      this.pets = data;
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getPets(category: string = null): Pet[]
  {
    return this.pets
      .filter(p => category == null || category === p.category);
  }

  getPet(id: number): Pet
  {
    return this.pets.find(p => p._id === id);
  }

  getCategories(): string[]
  {
    return this.categories;
  }

  savePet(savedPet: Pet): void
  {
    if (savedPet._id === null || savedPet._id === 0 || savedPet._id === undefined)
    {
      this.dataSource.addPet(savedPet).subscribe(p => {
        this.pets.push(savedPet);
      });
    }
    else
    {
      this.dataSource.updatePet(savedPet).subscribe(pet => {
        this.pets.splice(this.pets.findIndex(p => p._id === savedPet._id), 1, savedPet);
      });
    }
  }

  deletePet(deletedPetID: number): void
  {
    this.dataSource.deletePet(deletedPetID).subscribe(pet => {
      this.pets.splice(this.pets.findIndex(p => p._id === deletedPetID), 1);
    });
  }
}

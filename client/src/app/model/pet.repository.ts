import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class PetRepository {
    private pets: Pet[] = [];
    private categories: string[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getPets().subscribe(data => {
            this.pets = data;
            this.categories = data.map(p => p.category!).filter((c, index, array) => array.indexOf(c) === index).sort();
        });
    }


    getPets(category: string = null!): Pet[] {
        return this.pets.filter(p => category == null || category === p.category);
    }


    getPet(id: number): Pet {
        return this.pets.find(p => p._id === id) as Pet ;
    }

    getCategories(): string[] { 
        return this.categories; 
    }

    savePet(savedPet: Pet): void{
        if (savedPet._id === null || savedPet._id === 0 || savedPet._id === undefined)
    {
      this.dataSource.AddPet(savedPet).subscribe(b => {
        this.pets.push(savedPet);
      });
    }
    else
    {
      this.dataSource.updatePet(savedPet).subscribe(pet => {
        this.pets.splice(this.pets.findIndex(b => b._id === savedPet._id), 1, savedPet);
      });
    }
    }

    deletePet(deletedPetID: number): void
    {
    this.dataSource.deletePet(deletedPetID).subscribe(book => {
      this.pets.splice(this.pets.findIndex(b => b._id === deletedPetID), 1);
    });
  }
}
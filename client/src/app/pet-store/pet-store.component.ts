import { Component } from '@angular/core';
import { Pet } from '../model/pet.model';
import { PetRepository } from './../model/pet.repository';
import { Adoptionlist } from '../model/adoptionlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.css']
})
export class PetStoreComponent
{
  public selectedCategory = null;
  public petsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: PetRepository,
              private adoptionlist: Adoptionlist,
              private router: Router) { }

  get pets(): Pet[]
  {
    const pageIndex = (this.selectedPage - 1) * this.petsPerPage;
    return this.repository.getPets(this.selectedCategory)
    .slice(pageIndex, pageIndex + this.petsPerPage);
  }

  get categories(): string[]
  {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string): void
  {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.petsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getPets(this.selectedCategory).length / this.petsPerPage);
  }

  addPetToAdoptionlist(pet: Pet): void
  {
    this.adoptionlist.addLine(pet);
    this.router.navigateByUrl('/adoptionlist');
  }
}
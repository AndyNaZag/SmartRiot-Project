import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from 'src/app/model/pet.model';
import { PetRepository } from 'src/app/model/pet.repository';

@Component({
  templateUrl: './pet-table.component.html'
})
export class PetTableComponent implements OnInit {

  constructor(private repository: PetRepository,
              private router: Router) { }

  ngOnInit(): void {
  }

  getPets(): Pet[]
  {
    return this.repository.getPets();
  }

  deletePet(id: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deletePet(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/admin/main/pets');
    }
  }

  addPet(): void
  {
    this.router.navigateByUrl('/admin/main/pets/add');
  }

  editPet(id: number): void
  {
    this.router.navigateByUrl('/admin/main/pets/edit/' + id);
  }

}

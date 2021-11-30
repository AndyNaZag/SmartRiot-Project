import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/model/pet.model';
import { PetRepository } from 'src/app/model/pet.repository';

@Component({
  templateUrl: './pet-editor.component.html'
})
export class PetEditorComponent implements OnInit {
  editing = false;
  pet: Pet = new Pet();

  constructor(private repository: PetRepository,
              private router: Router,
              activeRoute: ActivatedRoute)
  {
    this.editing = activeRoute.snapshot.params.mode === 'edit';

    if (this.editing)
    {
      Object.assign(this.pet, repository.getPet(activeRoute.snapshot.params.id));
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm): void
  {
    this.repository.savePet(this.pet);
    this.router.navigateByUrl('/admin/main/pets');
  }

}

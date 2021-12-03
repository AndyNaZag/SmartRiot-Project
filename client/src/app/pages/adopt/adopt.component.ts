import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/model/pet.model';
import { PetRepository } from 'src/app/model/pet.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit {
  public selectedCategory = null;
  title!: string;

  constructor(private route: ActivatedRoute, private repository: PetRepository, private router: Router) {
   }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }

  get pets(): Pet[] {
    return this.repository.getPets(this.selectedCategory!);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string): void {
    this.selectedCategory = newCategory as any;
  }

  AddPet():void {
    this.router.navigateByUrl('adopt/add');
  }

  EditPetInfo(id: number): void
  {
    this.router.navigateByUrl('adopt/edit/' + id);
  }

  DeletePetInfo(id: number): void{
    
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deletePet(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/adopt');
    }
  }
}

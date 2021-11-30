import { Injectable } from '@angular/core';
import { Pet } from './pet.model';

@Injectable()
export class Adoptionlist
{
  public lines: AdoptionlistLine[] = [];
  public itemCount = 0;
  public adoptionlistPrice = 0;

  addLine(pet: Pet, quantity: number = 1): void
  {
    const line = this.lines.find(l => l.pet._id === pet._id);
    if (line !== undefined)
    {
      line.quantity += quantity;
    }
    else
    {
      this.lines.push(new AdoptionlistLine(pet, quantity));
    }
    this.recalculate();
  }

  updateQuantity(pet: Pet, quantity: number): void
  {
    const line = this.lines.find(l => l.pet._id === pet._id);
    if (line !== undefined)
    {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: number): void
  {
    const index = this.lines.findIndex(l => l.pet._id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear(): void
  {
    this.lines = [];
    this.itemCount = 0;
    this.adoptionlistPrice = 0;
  }

  private recalculate(): void
  {
    this.itemCount = 0;
    this.adoptionlistPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.adoptionlistPrice += (l.quantity *  l.pet.price);
    });
  }
}

export class AdoptionlistLine
{
  constructor(public pet: Pet,
              public quantity: number){  }

  get lineTotal(): number
  {
    return this.quantity * this.pet.price;
  }
}

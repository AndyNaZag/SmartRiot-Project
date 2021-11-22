import { Injectable } from "@angular/core";
import { Pet } from "./pet.model";

@Injectable()
export class PetInfo{
    public _id?: number;
    public name?: string;
    public category?: string;
    public description?: string;
    public age?: number;

    editInfo(pet: Pet): void {
        this._id = pet._id;
        this.name = pet.name;
        this.category = pet.category;
        this.description = pet.description;
        this.age = pet.age;
    }

    clear(): void{
        this._id = null;
        this.name = null;
        this.category = null;
        this.description = null;
        this.age = null;
    }

    get petId(): number{
        return this._id!;
    }

    get petName(): string{
        return this.name!;
    }

    get petCategory(): string{
        return this.category!;
    }
    get petDescription(): string{
        return this.description!;
    }
    get petAge(): number{
        return this.age!;
    }
}
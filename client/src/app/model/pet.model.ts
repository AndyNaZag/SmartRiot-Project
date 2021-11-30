export class Pet
{
  constructor(
    // tslint:disable-next-line: variable-name
    public _id?: number,
    public name?: string,
    public category?: string,
    public breed?: string,    
    public age?: number,
    public vaccine?: boolean,
    public description?: string,
    public price?: number
  ){}

  public toString(): string
  {
    return `
    Pet
    -------------------------------
    Name       : ${this.name}
    Category   : ${this.category}
    Breed      : ${this.breed}
    Age        : ${this.age}
    Vaccine    : ${this.vaccine}
    Description: ${this.description}
    Price      : ${this.price}
    -------------------------------
    `;
  }
}

export class Pet {
    constructor(
        public _id?: number,
        public name?: string,
        public category?: string,
        public description?: string,
        public age?: number) { }
    
        public toString(): string{
            return `Pet
            -------------------------------
            Name       : ${this.name}
            Author     : ${this.category}
            Description: ${this.description}
            Price      : ${this.age}
            -------------------------------`;
        }
    }
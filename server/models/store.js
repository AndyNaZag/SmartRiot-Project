"use strict"
class Pet
{
    constructor(_id = "", name = "", category ="", breed="", age=0, vaccine=false, description="", price = 0)
    {
        this._id = _id;
        this.name = name;
        this.category = category;
        this.breed = breed;
        this.age = age;
        this.vaccine = vaccine;
        this.description = description;
        this.price = price;
    }

    toString()
    {
        return "_id          :" + this._id + "\n" +
               " name        : " + this.name + "\n" +
               " category    : " + this.category + "\n" +
               " breed       : " + this.breed + "\n" +
               " age         : " + this.age + "\n" +
               " vaccine     : " + this.vaccine + "\n" +
               " description :" + this.description + "\n" +
               " price       :" + this.price;
    }
}

class Line
{
    constructor(pet = new Pet(), quantity = 1)
    {
        this.pet = pet;
        this.quantity  = quantity;
    }

    toString()
    {
        return "{" + this.pet.toString() + "}, \n" +
            " quantity: " + this.quantity;
    }

    total()
    {
        return this.pet.price * this.quantity;
    }
}

class Adoptionlist
{
    constructor(lines = [], itemCount = 0, adoptionlistPrice = 0)
    {
        this.lines = lines;
        this.itemCount = itemCount;
        this.adoptionlistPrice = adoptionlistPrice;
    }

    toString() 
    {
        let outputString = "";
        let count = 0;
        
        for(let line of this.lines)
        {
        outputString += "{" + line.toString();
        count++;
        outputString += (count > this.lines.length) ? "}, \n" : "} \n";
        }
        outputString += ", itemCount: " + this.itemCount + "\n";
        outputString += ", adoptionlistPrice: " + this.adoptionlistPrice;
        return outputString;
    }

    addLine(line)
    {
        this.lines.push(line);
        this.adoptionlistPrice += line.total();
    }

    empty()
    {
        this.lines = [];
        this.itemCount = 0;
        this.adoptionlistPrice = 0;
    }
}

module.exports.Adoptionlist = Adoptionlist;
module.exports.Line = Line;
module.exports.Pet = Pet;
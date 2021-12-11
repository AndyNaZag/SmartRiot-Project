import { Injectable } from '@angular/core';
import { Adoptionlist } from './adoptionlist.model';

@Injectable()
export class Order
{
  // tslint:disable-next-line: variable-name
  public _id: number;
  public orderid: string;
  public name: string;
  public address: string;
  public city: string;
  public province: string;
  public postalCode: string;
  public country: string;
  public approved = false;
  public rejected = false;

  constructor(public adoptionlist: Adoptionlist) {}

  clear(): void
  {
    this._id = null;
    this.orderid = null;
    this.name = null;
    this.address = null;
    this.city = null;
    this.province = null;
    this.postalCode = null;
    this.country = null;
    this.approved = false;
    this.rejected = false;
    this.adoptionlist.clear();
  }
}

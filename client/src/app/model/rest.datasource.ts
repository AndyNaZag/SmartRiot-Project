import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './pet.model';
import { Adoptionlist } from './adoptionlist.model';
import { Order } from './order.model';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './user.model';

const PROTOCOL = 'https';
const PORT = 3500;

@Injectable()
export class RestDataSource
{
  user: User;
  baseUrl: string;
  authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient,
              private jwtService: JwtHelperService)
  {
    this.user = new User();
    //this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    this.baseUrl = `https://smart-riot.herokuapp.com/api/`;
  }

  getPets(): Observable<Pet[]>
  {
    return this.http.get<Pet[]>(this.baseUrl + 'pet-list');
  }

  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return this.http.post<Order>(this.baseUrl + 'orders/add', order);
  }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  addPet(pet: Pet): Observable<Pet>
  {
    this.loadToken();
    return this.http.post<Pet>(this.baseUrl + 'pet-list/add', pet, this.httpOptions);
  }

  updatePet(pet: Pet): Observable<Pet>
  {
    this.loadToken();
    return this.http.post<Pet>(`${this.baseUrl}pet-list/edit/${pet._id}`, pet, this.httpOptions);
  }

  deletePet(id: number): Observable<Pet>
  {
    this.loadToken();

    console.log(id);

    return this.http.get<Pet>(`${this.baseUrl}pet-list/delete/${id}`, this.httpOptions);
  }

  getOrders(): Observable<Order[]>
  {
    this.loadToken();
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }

  deleteOrder(id: number): Observable<Order>
  {
    this.loadToken();
    return this.http.get<Order>(`${this.baseUrl}orders/delete/${id}`, this.httpOptions);
  }

  updateOrder(order: Order): Observable<Order>
  {
    this.loadToken();
    return this.http.post<Order>(`${this.baseUrl}orders/edit/${order._id}`, order, this.httpOptions);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}


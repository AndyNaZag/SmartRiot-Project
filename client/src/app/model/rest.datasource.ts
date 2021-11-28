import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './pet.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.models';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  user: User;
  baseUrl: string;
  authToken!: string;

  private httpOptions =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.user = new User();
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: User): Observable<any>
  {console.log(user);
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  { console.log(user);
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

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.baseUrl + 'adopt');
  }

  AddPet(pet: Pet): Observable<Pet> {
    console.log(JSON.stringify(pet));
    return this.http.post<Pet>(this.baseUrl + 'add', pet);
  }

  updatePet(pet: Pet): Observable<Pet>
  {
    console.log(JSON.stringify(pet));
    this.loadToken();
    return this.http.post<Pet>(this.baseUrl + 'edit/' + pet._id, pet);
  }

  deletePet(id: number): Observable<Pet>
  {
    this.loadToken();

    console.log(id);

    return this.http.get<Pet>(this.baseUrl + 'delete/' + id);
  }

  private loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token!;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
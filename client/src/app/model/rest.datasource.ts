import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './pet.model';
import { JwtHelperService } from '@auth0/angular-jwt';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
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
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private urlApi = 'https://rickandmortyapi.com/api/character/1,182';

  private urlApi ='http://localhost:3000/api/v1/persons';

  private apiUrl ='http://localhost:3000/api/v1/persons';

  constructor(private http: HttpClient ) { }

   // Método para obtener datos
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }

  // Método para agregar una persona
  addPerson(person: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, person);
  }

  // Método para eliminar una persona
  deletePerson(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Método para actualizar una persona
  updatePerson(id: number, person: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, person);
  }
}

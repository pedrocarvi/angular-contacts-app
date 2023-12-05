import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private appUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Contact';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZ2l2ZW5fbmFtZSI6Ikx1aXMgR29uemFsZXoiLCJmYW1pbHlfbmFtZSI6IkdvbnphbGVzIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE3MDE3MjY3MTYsImV4cCI6MTcwMTczMDMxNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTI4NTIiLCJhdWQiOiJhZ2VuZGFhcGkifQ.z8lqSlwgMYMNKriWD-b3niau4ttLQmHtRFJpxqkU_2Q',
    });
  }

  private getCommonHeaders(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  // Endpoints
  getContacts(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(
      `${this.appUrl}${this.apiUrl}`,
      this.getCommonHeaders()
    );
  }

  getContactById(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(
      `${this.appUrl}${this.apiUrl}/${id}`,
      this.getCommonHeaders()
    );
  }

  getFavoriteContacts(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(
      `${this.appUrl}${this.apiUrl}/favs`,
      this.getCommonHeaders()
    );
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.appUrl}${this.apiUrl}?id=${id}`,
      this.getCommonHeaders()
    );
  }

  addContact(contact: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(
      `${this.appUrl}${this.apiUrl}`,
      contact,
      this.getCommonHeaders()
    );
  }

  updateContact(id: number, contact: Contacto): Observable<void> {
    return this.http.put<void>(
      `${this.appUrl}${this.apiUrl}?id=${id}`,
      contact,
      this.getCommonHeaders()
    );
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(
        `https://localhost:7027/api/User`,
        user,
        this.getCommonHeaders()
      )
      .pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          throw error;
        })
      );
  }
}

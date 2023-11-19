import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto';

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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZ2l2ZW5fbmFtZSI6Ikx1aXMgR29uemFsZXoiLCJmYW1pbHlfbmFtZSI6IkdvbnphbGVzIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE3MDA0MjUyMTcsImV4cCI6MTcwMDQyODgxNywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTI4NTIiLCJhdWQiOiJhZ2VuZGFhcGkifQ.aroI68KGyKJMehISb8bewoKMBEjVwD1SFB7z1aO8gzA',
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
}

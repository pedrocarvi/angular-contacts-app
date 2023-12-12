import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contacto } from '../interfaces/contacto';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private appUrl: string = environment.endpoint;
  private apiUrl: string = 'api/Contact';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getCommonHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError(
      'Hubo un error en la solicitud. Por favor, inténtalo de nuevo.'
    );
  }

  // Endpoints
  getContacts(): Observable<Contacto[]> {
    return this.http
      .get<Contacto[]>(`${this.appUrl}${this.apiUrl}`, this.getCommonHeaders())
      .pipe(catchError(this.handleError));
  }

  getContactById(id: number): Observable<Contacto> {
    return this.http
      .get<Contacto>(
        `${this.appUrl}${this.apiUrl}/${id}`,
        this.getCommonHeaders()
      )
      .pipe(catchError(this.handleError));
  }

  getFavoriteContacts(): Observable<Contacto[]> {
    return this.http
      .get<Contacto[]>(
        `${this.appUrl}${this.apiUrl}/favs`,
        this.getCommonHeaders()
      )
      .pipe(catchError(this.handleError));
  }

  deleteContact(id: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.appUrl}${this.apiUrl}?id=${id}`,
        this.getCommonHeaders()
      )
      .pipe(catchError(this.handleError));
  }

  addContact(contact: Contacto): Observable<Contacto> {
    return this.http
      .post<Contacto>(
        `${this.appUrl}${this.apiUrl}`,
        contact,
        this.getCommonHeaders()
      )
      .pipe(catchError(this.handleError));
  }

  updateContact(id: number, contact: Contacto): Observable<void> {
    return this.http
      .put<void>(
        `${this.appUrl}${this.apiUrl}?id=${id}`,
        contact,
        this.getCommonHeaders()
      )
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(`https://localhost:7027/api/User`, user)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: User): Observable<string> {
    return this.http
      .post<string>(
        'https://localhost:7027/api/authentication/authenticate',
        user,
        { responseType: 'text' as 'json' }
      )
      .pipe(catchError(this.handleError));
  }
}

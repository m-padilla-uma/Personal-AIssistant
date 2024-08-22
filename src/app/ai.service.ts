import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'http://127.0.0.1:5000'
  constructor(private http: HttpClient) {}

  getAssistance(formData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('FORMDATA:', formData)
    return this.http.post<any>(`${this.apiUrl}/get-assistance`, JSON.stringify(formData), { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error:', error); // Log any errors that occur
          return throwError(() => new Error('Something went wrong with the request.\n', error)); // Rethrow the error to propagate it
        })
      );
  }

}

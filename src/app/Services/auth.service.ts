import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private APIUrl = 'http://localhost:3000'
  private APIUrl = 'https://x-games-backend.onrender.com'


  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }

  register(user: any): Observable<any> {
    return this.http.post(this.APIUrl + '/register', user)
  }

  login(user: any): Observable<any> {
    return this.http.post(this.APIUrl + '/login', user);
  }


}

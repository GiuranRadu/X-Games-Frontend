import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // private APIUrl = 'http://localhost:3000'
  private APIUrl = 'https://x-games-backend.onrender.com/games'


  constructor(private http: HttpClient) { }

  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }

  getAllGames(token: any): Observable<any> {
    return this.http.get(this.APIUrl, { headers: this.createHeader(token) })
  }

  getGameById(id: any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/${id}`, { headers: this.createHeader(token) })
  }

  getGamesByPlatform(platform: any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/?platform=${platform}`, { headers: this.createHeader(token) })
  }

  getGamesByValue(term: any,value:any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/?${term}=${value}`, { headers: this.createHeader(token) })

  }

  


}

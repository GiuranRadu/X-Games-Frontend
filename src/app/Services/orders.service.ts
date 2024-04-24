import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // private APIUrl = 'http://localhost:3000/orders'
  private APIUrl = 'https://x-games-backend.onrender.com/orders'

  constructor(private http: HttpClient) { }


  //* Send token by header
  private createHeader(token: any) {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'bearer ' + token)
    }
    return headers
  }

  createOrder(userId: any, order: any, token: any): Observable<any> {
    return this.http.post(this.APIUrl + `/${userId}`, order, { headers: this.createHeader(token) })
  }

  getUserOrders(userId: any, token: any): Observable<any> {
    return this.http.get(this.APIUrl + `/userOrders/${userId}`,{ headers: this.createHeader(token) })
  }

  getCartNumber(){
    return 
  }

  

}

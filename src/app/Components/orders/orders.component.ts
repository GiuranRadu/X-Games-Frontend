import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  myOrders : any[] = [];
  token: any;
  loggedUser: any;



  constructor(private ordersService: OrdersService,private cookies: CookieService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails();

    this.ordersService.getUserOrders(this.loggedUser._id, this.token).subscribe((result)=>{
      this.myOrders = result.data.orders;
      console.log(this.myOrders);
    })  
  }

  formatCreatedAtDate(date: Date): string {
    return this.datePipe.transform(date, 'd MMMM (yyyy) --- HH:mm');
  }


  
  getLoggedUserDetails() {
    const userDataString = this.cookies.get('loggedUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.loggedUser = userData;
    } else {
      console.log('No users logged');
    }
  }

  
}

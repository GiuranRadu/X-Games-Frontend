import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationDialogComponent } from './Partials/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/Services/cart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'X-Games';
  path: string = '';
  faCartPlus = faCartPlus
  faCartShopping = faCartShopping;
  cartQuantity = 0;

  constructor(private CartService: CartService, private router: Router, private cookieService: CookieService, public dialog: MatDialog) {      

  }
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = this.router.url; //! Get the current URL path
        console.log(this.path);
      }
    });
    this.refreshCartQuantity()    
  }

  

  refreshCartQuantity() {
    this.cartQuantity = this.CartService.getCartQuantity()
  }


  logoutButton() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Are you sure you want to logout ? `
      }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.cookieService.delete('token');
        this.cookieService.delete('loggedUser');

        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000)
      }
    })

  }

}
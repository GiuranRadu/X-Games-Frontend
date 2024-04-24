import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'src/app/Services/cart.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';




@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  cartGames: any[] = [];
  token: any;
  loggedUser: any;
  paymentMethod = undefined;
  icon = faLock
  cardForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(private CartService: CartService, private OrdersService: OrdersService, private cookies: CookieService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.cartGames = this.CartService.getCart();
    this.token = this.cookies.get("token");
    this.getLoggedUserDetails();

    this.cardForm = new FormGroup({
      creditCard: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')])
    });
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


  @ViewChild('option1') option1: any;
  @ViewChild('option2') option2: any;
  @ViewChild('option3') option3: any;
  @ViewChild('div1') div1: any;
  @ViewChild('div2') div2: any;
  @ViewChild('div3') div3: any;
  cardSelected: boolean = false;
  isOptionSelected: boolean = false;
  onOptionSelected() {
    if (this.option1.nativeElement.checked) {
      this.isOptionSelected = true
      this.cardSelected = true;
      this.paymentMethod = this.option1.nativeElement.value
      this.div1.nativeElement.classList.add('selected');
      this.div2.nativeElement.classList.remove('selected');
      this.div3.nativeElement.classList.remove('selected');

    } else if (this.option2.nativeElement.checked) {
      this.isOptionSelected = true
      this.cardSelected = false;
      this.paymentMethod = this.option2.nativeElement.value
      this.div1.nativeElement.classList.remove('selected');
      this.div2.nativeElement.classList.add('selected');
      this.div3.nativeElement.classList.remove('selected');

    } else if (this.option3.nativeElement.checked) {
      this.isOptionSelected = true
      this.cardSelected = false;
      this.paymentMethod = this.option3.nativeElement.value
      this.div1.nativeElement.classList.remove('selected');
      this.div2.nativeElement.classList.remove('selected');
      this.div3.nativeElement.classList.add('selected');
    } else {
      console.log('Nimic');
    }
  }

  test() {
    console.log(this.adress.nativeElement.value);
    console.log(this.cardForm.value.creditCard);
  }


  @ViewChild('adress') adress: any;
  sendOrder() {
    //!Check if cart exists
    if (this.cartGames.length > 0) {
      //! Check if playment option is selected and adress is completed
      if (this.isOptionSelected && this.adress.nativeElement.value) {
        let order = {
          creatorName: this.loggedUser.name,
          productsOrdered: this.cartGames,
          shippingAdress: this.adress.nativeElement.value,
          paymentMethod: this.paymentMethod
        };
        //! If payment method is `card`, create a condition to check if card number is completed
        if (this.paymentMethod === "card" && this.cardForm.value.creditCard) {
          this.OrdersService.createOrder(this.loggedUser._id, order, this.token).subscribe(() => {            
            this.succesMessage()
          });
        } else if (this.paymentMethod !== "card") {
          this.OrdersService.createOrder(this.loggedUser._id, order, this.token).subscribe(() => {           
            this.succesMessage()
          });
        } else {
          this.cannotPlaceOrder()
        }
      } else {
        this.cannotPlaceOrder()
      }
    } else {
      this.cannotPlaceOrder()
    }
  }


  succesMessage() {
    Swal.fire("Order placed successfully 🎮✅ \n Cart is now empty 🛒");
    this.CartService.clearCart()
    setTimeout(() => {
      this.router.navigate(['/main/gamesLibrary']);
    }, 2000);
  }

  cannotPlaceOrder() {
    let message: any;
    if(!this.isOptionSelected){
      message = "Please select a payment method"
    }
    if(this.isOptionSelected && this.adress.nativeElement.value && !this.cardForm.value.creditCard){
      message = "Please complete card number"
    }
    if(this.isOptionSelected && !this.adress.nativeElement.value){
      message = "Please enter your adress"
    }
    if (this.cartGames.length === 0){
      message = "Cart is empty"
    }
    this.snackBar.open(`${message}❌`, 'Close', {
      duration: 2000, 
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


  sum: number = 0;
  totalPrice(): number {
    this.sum = this.cartGames.reduce((acc, game) => acc + (game.price * game.quantity), 0);
    return this.sum;
  }

}

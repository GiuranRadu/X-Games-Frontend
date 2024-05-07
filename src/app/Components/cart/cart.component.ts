import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartGames: any[] = [];
  order: any;
  faTrashAlt = faTrashAlt;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  

  constructor(private CartService: CartService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartGames = this.CartService.getCart();
    console.log(this.cartGames);
  }


  increaseQuantity(game: any): void {
    console.log(game._id);
    this.CartService.increaseQuantity(game._id)
    this.refreshProducts();
    this.snackBar.open(`Quantity ➕ `, 'Close', {
      duration: 3000, 
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }


  decreaseQuantity(game: any): void {
    console.log(game._id);
    if (game.quantity <= 1) {
      console.log('Not allowed');
    } else {
      this.CartService.decreaseQuantity(game._id)
      this.refreshProducts()
      this.snackBar.open(`Quantity ➖`, 'Close', {
        duration: 3000, 
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }


  @ViewChildren('games') games: QueryList<ElementRef>;
  removeGame(game: any, index: number) {
    // Ensure that the index is within the valid range
    this.CartService.removeFromCartById(game._id);
    if (index >= 0 && index < this.games.length) {
      // Access the nativeElement property of the selected game
      const selectedGame = this.games.toArray()[index];
      if (selectedGame) {
        selectedGame.nativeElement.classList.add('destroy');
        setTimeout(() => {
          this.refreshProducts()
        }, 1100)
      }
    }
  }


  refreshProducts() {
    this.cartGames = this.CartService.getCart();
  }

  sum: number = 0;
  totalPrice(): number {
    // this.sum = this.cartGames.reduce((acc, game) => acc + (game.price * game.quantity), 0);    
    this.sum = this.cartGames.reduce((acc, game) => {
      const price = game.discount ? (game.price - game.price * game.discount / 100) : game.price;
      return acc + (price * game.quantity);
    }, 0);
    return this.sum;
  }


  goToPlaceOrder() {
    this.router.navigateByUrl('main/placeOrder')
  }

  test() { }


}

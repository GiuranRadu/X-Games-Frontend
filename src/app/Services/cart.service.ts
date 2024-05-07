import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartData = JSON.parse(localStorage.getItem('cartData') ?? '[]');
  private cartDataSubject: BehaviorSubject<any> = new BehaviorSubject(this.cartData);

  getCartDataObservable(): Observable<any> {
    return this.cartDataSubject.asObservable()
  }

  getCartQuantity() {
    const cartData = localStorage.getItem('cartData');
    let length = JSON.parse(cartData).length
    return length
  }

  getCart(): any[] {
    const cartData = localStorage.getItem('cartData');
    return cartData ? JSON.parse(cartData) : [];
  }


  addToCart(item: any): void {
    // Check if the item already exists in the cartData
    const existingItem = this.cartData.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      // If the item already exists, you can update quantity or handle it accordingly
      Swal.fire({
        position: "bottom-end",
        icon: "warning",
        title: "Game already exists in the cart",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'your-custom-class'
        }
      });

    } else {
      // If the item doesn't exist, add it to the cartData
      this.cartData.push(item);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Game added to Cart",
        showConfirmButton: false,
        timer: 1500
      });

      // Update the local storage with the updated cart data
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
      this.cartDataSubject.next(this.cartData);
    }
  }

  removeFromCartById(itemId: any): void {
    // Find the index of the item in the cartData array
    const index = this.cartData.findIndex(item => item._id === itemId);

    if (index !== -1) { //! nice trick to see if index exists 
      this.cartData.splice(index, 1);
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
      this.cartDataSubject.next(this.cartData);
    }
    Swal.fire({
      position: "bottom-end",
      icon: "error",
      title: "Game removed",
      showConfirmButton: false,
      timer: 1500
    });
  }


  increaseQuantity(itemId: any) {
    const foundItem = this.cartData.find(item => item._id === itemId);
    if (foundItem) {
      foundItem.quantity += 1;
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  }


  decreaseQuantity(itemId: any) {
    const foundItem = this.cartData.find(item => item._id === itemId);
    if (foundItem) {
      foundItem.quantity -= 1;

      localStorage.setItem('cartData', JSON.stringify(this.cartData));
    }
  }

  clearCart() {
    localStorage.removeItem('cartData');
  }

}

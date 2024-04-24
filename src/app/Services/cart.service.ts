import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getCartQuantity() {
    const cartData = localStorage.getItem('cartData');
    let length = JSON.parse(cartData).length
    console.log(length);
    return length
  }

  getCart(): any[] {
    const cartDataString = localStorage.getItem('cartData');
    return cartDataString ? JSON.parse(cartDataString) : [];
  }



  addToCart(item: any): void {
    // Retrieve existing cart data from local storage
    let cartDataString = localStorage.getItem('cartData');
    let cartData = JSON.parse(cartDataString) || [];

    // Check if the item already exists in the cartData
    const existingItem = cartData.find(cartItem => cartItem._id === item._id);

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
      cartData.push(item);
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Game added to Cart",
        showConfirmButton: false,
        timer: 1500
      });

      // Update the local storage with the updated cart data
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }

  removeFromCartById(itemId: any): void {
    // Retrieve existing cart data from local storage
    let cartDataString = localStorage.getItem('cartData');
    let cartData = JSON.parse(cartDataString) || [];

    // Find the index of the item in the cartData array
    const index = cartData.findIndex(item => item._id === itemId);

    if (index !== -1) { //! nice trick to see if index exists 
      cartData.splice(index, 1);

      // Update the local storage with the updated cart data
      localStorage.setItem('cartData', JSON.stringify(cartData));
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
    let cartDataString = localStorage.getItem('cartData');
    let cartData = JSON.parse(cartDataString) || [];

    const foundItem = cartData.find(item => item._id === itemId);
    if (foundItem) {
      foundItem.quantity += 1;

      // Update the local storage with the updated cart data
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }


  decreaseQuantity(itemId: any) {
    let cartDataString = localStorage.getItem('cartData');
    let cartData = JSON.parse(cartDataString) || [];

    const foundItem = cartData.find(item => item._id === itemId);
    if (foundItem) {
      foundItem.quantity -= 1;

      // Update the local storage with the updated cart data
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }

  clearCart() {
    localStorage.removeItem('cartData');
  }



}

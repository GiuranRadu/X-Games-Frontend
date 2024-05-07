import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  private favorites: any = this.getFavoritesFromLocalStorage();
  private favoritesSubject: BehaviorSubject<any> = new BehaviorSubject(this.favorites);

  constructor(private snackBar: MatSnackBar) { }

  getFavoritesObservable(): Observable<any> {
    return this.favoritesSubject.asObservable()
  }

  addToFavorites(game: any): void {
    let favoriteIndex = this.favorites.findIndex(item => item._id === game._id);

    if (favoriteIndex !== -1) {
      this.favorites.splice(favoriteIndex, 1)
      this.setFavoritesToLocalStorage();
      this.snackBar.open(`Removed from Favorites`, '❌', {
        duration: 3000, 
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      
    } else {
      this.favorites.push(game);
      this.setFavoritesToLocalStorage();      
      this.snackBar.open(`Added To Favorites`, '✅', {
        duration: 3000, 
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }


  private setFavoritesToLocalStorage() {
    const favoritesJson = JSON.stringify(this.favorites);
    localStorage.setItem('Favorites', favoritesJson);
    this.favoritesSubject.next(this.favorites)
  }

  private getFavoritesFromLocalStorage() {
    const favoritesJson = localStorage.getItem('Favorites');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }
}

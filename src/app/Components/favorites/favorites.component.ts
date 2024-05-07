import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/Services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: any = []

  ngOnInit(): void {
    console.log(this.favorites);
  }

  constructor(private favoritesService: FavoritesService){
    this.favoritesService.getFavoritesObservable().subscribe((x)=>{
      this.favorites = x
    })
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GamesService } from 'src/app/Services/games.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/Services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.scss']
})
export class GamesLibraryComponent implements OnInit {

  constructor(private GS: GamesService, private cookies: CookieService, private CartService: CartService, private router: Router) { }

  games: any[] = []
  token: any;
  faCartPlus = faCartPlus
  faTrash = faTrash
  existingCartData = JSON.parse(localStorage.getItem('cartData')) || [];
  gameType = ["RPG", "Racing", "Shooter", "Action", "Sports", "Adventure", "Simulation", "Fighting", "Strategy", "Battle Royale", "Retro"];


  typeForm: FormGroup;


  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.typeForm = new FormGroup({
      type: new FormControl('')
    })

    this.GS.getAllGames(this.token).subscribe((result) => {
      this.games = result.data.games
    }, (error) => {
      console.log("error", error.error);
    })

  }

  test() {    
    let value = this.typeForm.value.type
    if(value){
      this.GS.getGamesByValue("gameType",value ,this.token).subscribe((result) => {
        this.games = result.data.games
  
      }, (error) => {
        console.log("error", error.error);
      })
    }else{
      this.GS.getAllGames(this.token).subscribe((result) => {
        this.games = result.data.games
      }, (error) => {
        console.log("error", error.error);
      })
    }
    
  }


  addToCart(game: any): void {
    this.CartService.addToCart({ ...game, quantity: 1 });
  }

  goToGame(game: any) {
    this.router.navigate(['/main/gamesLibrary', game._id]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    });  }




}

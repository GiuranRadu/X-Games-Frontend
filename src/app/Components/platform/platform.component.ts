import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GamesService } from 'src/app/Services/games.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/Services/cart.service';
import { FavoritesService } from 'src/app/Services/favorites.service';


@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  platform: any
  token: any;
  faCartPlus = faCartPlus
  faHeart = faHeart


  games: any[] = []

  constructor(private route: ActivatedRoute, private GS: GamesService, private cookies: CookieService, private CartService: CartService, private router: Router, private FavoriteService: FavoritesService) {

  }

  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.route.paramMap.subscribe(params => {
      this.platform = params.get('id');
    });

    this.GS.getGamesByPlatform(this.platform, this.token).subscribe(data => {
      this.games = data.data.games
    })
  }


  test() {
    console.log(this.games);
  }

  goToGame(game: any) {
    console.log(game);
    this.router.navigate(['/main/gamesLibrary', game._id])

  }


  addToCart(game: any): void {
    this.CartService.addToCart({ ...game, quantity: 1 });
  }

  addToFavorites(game: any) {
    console.log(game);
    this.FavoriteService.addToFavorites(game)
  }


}

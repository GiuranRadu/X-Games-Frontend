import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GamesService } from 'src/app/Services/games.service';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/Services/cart.service';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  gameId: string;
  game!: any;
  token: any;
  faHeart = faHeart

  constructor(private route: ActivatedRoute, private GS: GamesService,private cookies: CookieService,private CartService: CartService){}

  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
    });

    this.GS.getGameById(this.gameId, this.token).subscribe((result)=>{
      this.game = result.data.game
      // console.log(this.game);
    })

  }

  addToCart(): void {
    this.CartService.addToCart({ ...this.game, quantity: 1 });
    console.log(`Game ${this.game.name} added to cart`);
  }

  test(){
    console.log(this.game.gameType);
  }

}

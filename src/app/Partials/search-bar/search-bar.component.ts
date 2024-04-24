import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GamesService } from 'src/app/Services/games.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  token: any;
  games: any[] = [];
  searchForm: FormGroup;
  searchText: any;

  constructor(private GS: GamesService, private cookies: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.cookies.get("token");

    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    })

    this.GS.getAllGames(this.token).subscribe((result) => {
      this.games = result.data.games
    }, (error) => {
      console.log("error", error.error);
    })


  }

  onKeyUp() {
    this.searchText = this.searchForm.value.searchInput;
  }

  goToGame(game: any) {
    console.log(game);
    this.searchText = ''
    this.searchForm.reset();
    this.router.navigate(['/main/gamesLibrary', game._id]);
    setTimeout(() => {
      location.reload();
    }, 100);
  }

}

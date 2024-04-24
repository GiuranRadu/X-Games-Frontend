import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() maxRating: number = 5;
  @Input() selectedRating: number = 0;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  stars: number[] = [];


  ngOnInit(): void {
    this.stars = Array(this.maxRating).fill(0).map((_, index) => index + 1);
  }
  
  rate(rating: number): void {
    this.selectedRating = rating;
    this.ratingClicked.emit(rating);
    console.log(rating);
  }
}

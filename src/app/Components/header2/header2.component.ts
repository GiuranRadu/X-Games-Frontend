import { Component } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component {
  icon = faShoppingCart
}

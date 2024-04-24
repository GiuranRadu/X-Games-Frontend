import { Component } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  faPhone=faPhone;
  faRocketchat=faRocketchat
  faCodepen=faCodepen

}

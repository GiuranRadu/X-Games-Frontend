import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  faMapLocation=faMapMarkerAlt
  address: string;
  center: google.maps.LatLngLiteral = { lat: 45.118822, lng: 24.371522 };
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral; // Single marker position

  ngOnInit(): void {
    this.center = { lat:  45.118898458991076, lng: 24.371985355791615 };
    this.markerPosition = this.center;
    this.getAddress(this.center);
  }



  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.center = event.latLng.toJSON();
    }
  }

  saveAddress(event: google.maps.MapMouseEvent): void {
    const location = event.latLng?.toJSON();
    if (location) {
      // Update the marker position
      this.markerPosition = location;

      // Update the address for the new marker position
      this.getAddress(location);
    }
  }

  getAddress(location: google.maps.LatLngLiteral): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        console.log('Address:', address);
        this.address = address;
      } else {
        console.error('Geocoding failed. Status:', status);
      }
    });
  }

  removeMarker(): void {
    // Remove the marker by setting its position to null
    this.markerPosition = null;
    this.address = ''; // Clear the address when removing the marker
  }


  
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {
  @ViewChild('map') mapRef: ElementRef;
  lat: any;
  lng: any;
  map: any;

  constructor(
    public navCtrl: NavController,
    private geo: Geolocation,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.geo.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      this.loadMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap() {
    // location
    const location = new google.maps.LatLng(this.lat, this.lng);

    // map option
    const options = {
      center: location,
      zoom: 12,
      streetViewControl: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    // add marker
    this.addMarker(location, this.map);
  }

  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({

  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  location: { lat: number, lng: number };

  constructor(private geolocation: Geolocation) { }

  getGeolocation(){
   this.geolocation.getCurrentPosition().then((resp: { coords: { latitude: number; longitude: number; }; }) => {
     this.location = {
       lat: resp.coords.latitude,
       lng: resp.coords.longitude
     };
   });
  }
  

  ionViewDidLoad() {
    //this.getGeolocation()
    console.log('ionViewDidLoad GeolocationPage');
  }

}
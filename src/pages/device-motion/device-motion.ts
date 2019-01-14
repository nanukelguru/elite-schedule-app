import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions} from '@ionic-native/device-motion';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { Subscription } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-device-motion',
  templateUrl: 'device-motion.html',
})
export class DeviceMotionPage {
  data: any;
  subscription: any;

  constructor(private deviceMotion: DeviceMotion) { }

  startWatching(){
     var options: DeviceMotionAccelerometerOptions = {
      frequency:500
     };

    this.deviceMotion.getCurrentAcceleration().then(
        (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
       (error: any) => console.log(error)
     ); 
     

    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;
      console.log(acceleration);
    });
    
    }
    stopWatching(){
      this.subscription.unsubscribe();
    }
  }





import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration';

@Component({
  templateUrl: 'vibration.html',
})
export class VibrationPage {

  constructor(private vibration: Vibration) { }
  
  vibrate(){
     this.vibration.vibrate(2000);
  }

  vibratePattern(){
    this.vibration.vibrate([2000, 1000,500]);
  }
   
}

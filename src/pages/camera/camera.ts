import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  imgSrc: any;

  constructor(private camera : Camera) { }

    takePicture(){
      let options : CameraOptions = {
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        targetHeight: 500,
        targetWidth: 500,
        saveToPhotoAlbum: false
      };

      this.camera.getPicture(options).then((imageUri) => {
        this.imgSrc = imageUri;
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

}

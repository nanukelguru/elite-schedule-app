import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare var window: any

@IonicPage()
@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
  providers: [BarcodeScanner]
})
export class BarcodeScannerPage {
  results: any;

  constructor(private barcodeScanner: BarcodeScanner) {
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      //console.log('Barcode data', barcodeData);
      
    }).catch(err => {
      //console.log('Error', err);
      alert(`Error scanning': ${err}`);
    });
  }

  reset() {
    this.results = null;
  }
  
  lookup(){
    window.open(`https://www.upcindex.com/$this.results.text}`, '_system');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodeScannerPage');
  }

}

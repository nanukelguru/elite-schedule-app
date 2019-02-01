import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { VibrationPage } from '../pages/vibration/vibration';
//import { GeolocationPage } from '../pages/geolocation/geolocation';
import { CameraPage } from '../pages/camera/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DeviceMotionPage } from '../pages/device-motion/device-motion';
import { LocalNotificationsPage } from '../pages/local-notifications/local-notifications';
import { UserSettings } from '../providers/user-settings/user-settings';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private userSettings: UserSettings) {
    this.initializeApp();

    // used for an example of ngFor and navigation
  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.userSettings.initStorage().then(() => this.rootPage = MyTeamsPage)

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToVibration(){
    this.nav.push(VibrationPage);
  }
  // goToGeolocation(){
  //   this.nav.push(GeolocationPage);
  // }
  gotoCamera(){
    this.nav.push(CameraPage);
  }
  goToDeviceMotion(){
    this.nav.push(DeviceMotionPage)
  }
  goToLocalNotification(){
    this.nav.push(LocalNotificationsPage);
  }
}

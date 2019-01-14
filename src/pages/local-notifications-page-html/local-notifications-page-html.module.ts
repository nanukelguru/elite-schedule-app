import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalNotificationsPageHtmlPage } from './local-notifications-page-html';

@NgModule({
  declarations: [
    LocalNotificationsPageHtmlPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalNotificationsPageHtmlPage),
  ],
})
export class LocalNotificationsPageHtmlPageModule {}

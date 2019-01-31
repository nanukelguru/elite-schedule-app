import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-local-notifications',
  templateUrl: 'local-notifications.html',
})
export class LocalNotificationsPage {
  results: string;
  ln: LocalNotifications = new LocalNotifications();

  constructor(private localNotifications: LocalNotifications, private notification : Notification) {
    
    LocalNotifications.on(`click`, (notification: { data: string; }) => {
      var data = JSON.parse(notification.data);
      this.results = data.name;
      alert(`Notification received! (${data.name})`);
      
    });
  
  
  this.localNotifications.schedule({
    id: 1,
    title: 'Cool Notification',
    text: 'This is my cool notification!',
    data: {
      id:21,
      name: 'Cool Notification #21'
    }
  });
}
}

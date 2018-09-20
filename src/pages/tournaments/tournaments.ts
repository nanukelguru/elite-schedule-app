import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { TeamsPage } from '../teams/teams';
import { EliteApi } from '../../providers/elite-api/elite-api';


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteApi: EliteApi,
  public loadingController: LoadingController) {
  }
  //el loading component controller es algo que se usa frecuentemente para indicar a los usuarios que 
  //los datos han sido recuperados
  ionViewDidLoad() {
   let loader = this.loadingController.create({
    content: 'Getting tournaments... ',
    spinner: 'bubbles'
   });
  
   loader.present().then(() => {
    this.eliteApi.getTournaments().then(data => {
      this.tournaments = data;
      loader.dismiss();
   });
  });

  }
  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage,tourney)
    //this.navCtrl.push(MyTeamsPage);
    //this.navCtrl.pop();
    
  }

}

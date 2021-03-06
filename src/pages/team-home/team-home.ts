import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { StandingsPage } from '../standings/standings';
import { MyTeamsPage } from '../my-teams/my-teams';


@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
   public team: any = {};
   public teamDetailTab = TeamDetailPage;
   public standingsTab = StandingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //asignamos la propiedad team de arriba a los parametros de navegación
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }
  goHome() {
    // this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }

}

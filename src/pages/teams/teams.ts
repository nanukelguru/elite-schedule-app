 import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';
//usaremos  lodash para manejar esa lista grande y ponerla en grupos
import * as _ from 'lodash';


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  public teams = []; 
  //aqui agregaremos una variable privada para todos los equipos , esa lista grande
  private allTeams: any;
  private allTeamDivisions : any; 
  public queryText: string;
  // public teams = [
  
  //   { id: 1, name: 'HC Elite' },
  //   { id: 2, name: 'Team Takeover' },
  //   { id: 3, name: 'DC Thunder' }
  // ];

  constructor(
    private loadingController : LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi ) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    
    let loader = this.loadingController.create({
      content: 'Getting data...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data =>{
        //todos los equpos tienen la lista de todos los equipos
        this.allTeams = data.teams;
  
            //aqui colocamos el lodash
            this.allTeamDivisions =
            _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
  
        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams);

        loader.dismiss(); 
      });
    });

  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;

  }
}

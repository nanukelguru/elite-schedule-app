import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public divisionFilter = 'division'; 
  //para filtrar standings
  public standings: any[];
  //este es el currently selected team
  public team: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) { }

  ionViewDidLoad() { 
    //primero obtenemos el equipo seleccionado actualmente de navParams
    this.team = this.navParams.data;
    //luego obtenemos el curren tournament de eliteApi
    let tourneyData = this.eliteApi.getCurrentTourney();
    //luego obtenemos todos los standings de entiretournament en el array de standings
    this.standings = tourneyData.standings;
    this.allStandings = tourneyData.standings;

    //performing the lodash group by , propiedad para divisionName y propiedad para divisionStandings que 
    //contienen ese array  

      // this.allStandings =
      // _.chain(this.standings)
      //  .groupBy('division')
      //  .toPairs()
      //  .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
      //  .value();
    this.filterDivision(); 
    
    console.log('standings', this.standings);
    console.log('division Standings', this.allStandings);      
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex - 1].division) { 
      return record.division;
    }
    return null;
  }

  filterDivision() {
    if (this.divisionFilter === 'all') {
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }
}



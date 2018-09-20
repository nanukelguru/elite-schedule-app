import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash';
import { GamePage } from '../game/game';
import moment from 'moment';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  private allGames : any[];
  public dateFilter: string;
  public isFollowing = false;
  public team: any = {}; 
  public teamStanding: any = {};
  public games: any[];
  private tourneyData: any;
  public useDateFilter = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteApi: EliteApi) { }
   // console.log('**nav params', this.navParams);
  

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TeamDetailPage');
    this.team = this.navParams.data;
    
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return { 
                        gameId: g.id,
                        opponent: opponentName,
                        time: Date.parse(g.time),
                        location: g.location,
                        locationUrl: g.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? "vs." : "at")
                    };
                })
                  .value(); 
                  
  this.allGames = this.games;
  this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
  }

  dateChanged() {
    //añadimos una funcion datechange
    //this games igual a usamos una funcion para filtrar, despues el arrow function y es qui donde usamos
    //moment, especificamente el isSame method y tomamos el datefilter y filtramos por el dia , day, se puede
    //filtrar por dia, mes..segun sea el caso
    if(this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'))
    } else {
      this.games = this.allGames;
    }
    
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
        var teamScore = (isTeam1 ? team1Score : team2Score);
        var opponentScore = (isTeam1 ? team2Score : team1Score);
        var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
        return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
        return "";
    }
}

  
//  only use for demostration purposes
//   goHome(){
//     //this.navCtrl.push(MyTeamsPage);
//     //this.navCtrl.popToRoot();
//     console.log('**parent', this.navCtrl.parent);
//     this.navCtrl.parent.parent.popToRoot();
//   } 
  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame); 
    }
  
  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }  

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  toggleFollow() {

    if(this.isFollowing){
      let confirm = this.alertController.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              //TODO:persist data

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No'}
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      //TODO: persist data
    }

  }

}
 
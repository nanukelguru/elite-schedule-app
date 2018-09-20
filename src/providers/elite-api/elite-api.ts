import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-app-i2-c1058.firebaseio.com';
  private currentTourney: any = {};

  constructor(public http: Http) { }
  /*añadimos nuestro primer método de nuestro elite API service para obtener HTTP data 
  usaremos promise aquí, */

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    });
  }

  getTournamentData(tourneyId) : Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .map(response => {
      this.currentTourney = response.json();
      return this.currentTourney;
    });

  }
  
  getCurrentTourney() {
    return this.currentTourney;
  }
}

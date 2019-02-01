import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SqlStorage } from '../sql-storage/sql-storage';
import { Item } from 'ionic-angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const win: any = window;

@Injectable()
export class UserSettings {
  private sqlMode = false;

  constructor(private storage: Storage, private sql: SqlStorage) {
   if (win.sqlitePlugin) {
      this.sqlMode = true;
   } else {
     console.warn('Sqlite plugin not installed. Falling back to regular Ionic Storage.');
   }
  }

  favoriteTeam(team: { id: { toString: () => string; }; }, tournamentId: any, tournamentName: any) {
    let item = { team: team, tournamentId:tournamentId, tournamentName:tournamentName };
    //this.storage.set(team.id.toString(), JSON.stringify(item));

    if (this.sqlMode) {
      this.sql.set(team.id.toString(), JSON.stringify(Item));
    } else {
      this.storage.set(team.id.toString(), JSON.stringify(Item));
    }
  }
  
  unfavoriteTeam(team: { id: { toString: () => string; }; }) {
    //this.storage.remove(team.id.toString());

    if (this.sqlMode) {
      this.sql.remove(team.id.toString());
    } else {
      this.storage.remove(team.id.toString());
    }
  }

  async isFavoriteTeam(teamId: string) : Promise<boolean> { 
     // return this.storage.get(teamId).then(value => value ? true : false);
     if (this.sqlMode) {
       return this.sql.get(teamId.toString()).then(value => value ? true : false);
     } else {
       return new Promise(resolve => resolve(this.storage.get(teamId.toString()).then(value => value ? true : false)));
     }
  }

  async getAllFavorites() : Promise<any>{
    // let results = [];
    // this.storage.forEach(data => {
    //   console.log('***inside foreach', data);
    //   results.push(JSON.parse(data));
    // });
    // return results;
    if (this.sqlMode) {
      return this.sql.getAll();
    } else {
      return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
          console.log('***inside foreach', data);
          results.push(JSON.parse(JSON.stringify(data || null )));
        });
        return resolve(results);
      }); 
    }
  }
  
  async initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.initializeDatabase()
    } else {
      return new Promise(resolve => resolve());

    }
  }
}

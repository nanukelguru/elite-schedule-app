import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable()
export class SqlStorage {
  private db:SQLiteObject;

  constructor(private sqlite: SQLite) { }

  async getAll(){
    const data = await this.db.executeSql('SELECT key, value FROM kv', []);
    let results = [];
    for (let i = 0; i < data.rows.length; i++) {
      results.push(JSON.parse(data.rows.item(i).value));
    }
    return results;
  }
   
  async get(key: string) {
    const data = await this.db.executeSql('select key, value from kv where key = ? limit 1', [key]);
    if (data.rows.length > 0) {
      return JSON.parse(data.rows.item(0).value);
    }
  }
  
  remove(key: string) {
    return this.db.executeSql('delete from kv where key = ?' , [key]);
  }
  async set(key: string, value: string) {
    const data = await this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    if (data.rows.length > 0) {
      return JSON.parse(data.rows.item(0).value);
    }
  }

  initializeDatabase(){
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {
  
  
      db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
  
  
    })
    .catch(e => console.log(e));
  }
}

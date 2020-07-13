import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage'

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  favorites: string[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    public storage: Storage,
    public router: Router) {}

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  /*
  loginUser(user: any): Observable<any> {
    var url = 'http://localhost:3000/api/user/login';
    return this.http.post<User>(url, user, this.httpOptions)
    .pipe(
        tap(_ => {
          console.log("Calling login = " + JSON.stringify(user));
          this.login(user.email, user.password)
        }),
        catchError(this.handleError<User>(`Get User id=${user.email}`))
      );
  }
  */

  async loginUser(user: any): Promise<any> {
    var url = 'http://localhost:3000/api/user/login';
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let options = { headers: headers };
    return await this.http.post(url, user, options).toPromise()
      .then((res) => {
        this.storage.set('loggedIn', '1').then(() => {
          this.setEmail(user.email);
          this.setPassword(user.password);
        });
        return res;
      }, (err) => {
      }
    );
  }

  /*
  signupUser(user: User): Observable<User> {
    var url = 'http://localhost:3000/api/user/signup';
    return this.http.post<User>(url, user, this.httpOptions)
      .pipe(
        tap(_ => this.signup(user.email, user.password)),
        catchError(this.handleError<User>('Add User'))
      );
  }
  */

 async signupUser(user: User): Promise<any> {
  var url = 'http://localhost:3000/api/user/signup';
  let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  let options = { headers: headers };
  return await this.http.post(url, user, options).toPromise()
      .then((res) => {
        this.storage.set('loggedIn', '1').then(() => {
          this.setEmail(user.email);
          this.setPassword(user.password);
        });
        return res;
      }, (err) => {
      }
    );
}

  async logout(): Promise<any> {
    await this.storage.remove('email').then((res) => {
      if (res) {
        console.log("email removed : " + res)
      }
    });
    await this.storage.remove('password').then((res) => {
      if (res) {
        console.log("password removed : " + res)
      }
    });
    return await this.storage.remove('loggedIn').then((res) => {
      if (res) {
        console.log("loggedIn removed : " + res)
      }
    });
  }

  setEmail(email: string): Promise<any> {
    return this.storage.set('email', email);
  }

  setPassword(password: string): Promise<any> {
    return this.storage.set('password', password);
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get('seenTutorial').then((value) => {
      return value;
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
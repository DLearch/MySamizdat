import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  // Token //////////////////////////////////////

  private readonly tokenKey: string = 'jsonwebtoken';
  private tokenChanged = new Subject<boolean>();

  public get token(): any {

    if (this.isEmpty()) {
      return null;
    }

    return this.storage[this.tokenKey];
  }

  public set token(value: any) {

    if (value)
      this.storage.setItem(this.tokenKey, value);
    else {

      this.storage.removeItem(this.tokenKey);
      this.user = null;
    }

    this.tokenChanged.next(!this.isEmpty());
  }

  public isTokenChanged(): Observable<boolean> {

    return this.tokenChanged.asObservable();
  }

  // User ///////////////////////////////////////

  private readonly userKey: string = 'user';

  public get user(): User {

    const item = this.storage.getItem(this.userKey);

    if (item)
      return JSON.parse(item) as User;
    else
      return null;
  }

  public set user(user: User) {

    if (user)
      this.storage.setItem(this.userKey, JSON.stringify(user));
    else
      this.storage.removeItem(this.userKey);
  }

  public isEmpty(): boolean {

    return (
      this.storage[this.tokenKey] === undefined
      || this.storage[this.tokenKey] === null
      || this.storage[this.tokenKey].trim() === 'null'
      || this.storage[this.tokenKey].trim() === 'undefined'
      || this.storage[this.tokenKey].trim() === ''
    );
  }
}

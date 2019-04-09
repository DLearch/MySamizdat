import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserStorageService {

  get isAuth(): boolean { 
    return this.token != null;
  }

  private authSubject;
  authChanged;

  signIn(model: { token: string, userName: string, avatarPath: string, birthDate: string }) {
    this.token = model.token;
    this.userName = model.userName;
    this.avatarPath = model.avatarPath;
    this.birthDate = model.birthDate;
  }

  signOut() {
    this.token = null;
  }

  storage: Storage;
  private readonly tokenKey: string = 'jsonwebtoken';
  private readonly userNameKey: string = 'userName';

  constructor() {
    this.authSubject = new Subject<boolean>();
    this.authChanged = this.authSubject.asObservable();
    this.storage = window.localStorage;
    window.addEventListener("storage", () => this.updateAuth());
  }
  
  avatarPath: string = null;
  birthDate: string = null;

  get token(): string {

    if (!this.storage[this.tokenKey])
      return null;

    return this.storage[this.tokenKey];
  }

  set token(value: string) {
    
    if (value) {

      this.storage.setItem(this.tokenKey, value);
      this.authSubject.next(true);
    }
    else {

      this.storage.removeItem(this.tokenKey);
      this.userName = null;
      this.authSubject.next(false);
    }
  }

  get userName(): string {

    if (!this.storage[this.userNameKey])
      return null;

    return this.storage[this.userNameKey];
  }

  set userName(value: string) {

    if (value)
      this.storage.setItem(this.userNameKey, value);
    else
      this.storage.removeItem(this.userNameKey);
  }

  updateAuth(): void { }
}

import { Injectable } from '@angular/core';

@Injectable()
export class UserStorageService {

  get isAuth(): boolean {
    return this.token != null;
  }

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
    }
    else {

      this.storage.removeItem(this.tokenKey);
      this.userName = null;
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

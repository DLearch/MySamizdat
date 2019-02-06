import { Injectable } from '@angular/core';

@Injectable()
export class UserStorageService {

  user: any;

  storage: Storage;
  private readonly tokenKey: string = 'jsonwebtoken';
  private readonly userNameKey: string = 'userName';

  constructor() {

    this.storage = window.localStorage;
  }

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

}

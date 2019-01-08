import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

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

    this.storage[this.tokenKey] = value;

    this.tokenChanged.next(!this.isEmpty());
  }

  public isTokenChanged(): Observable<boolean> {

    return this.tokenChanged.asObservable();
  }

  // Name ///////////////////////////////////////

  private readonly nameKey: string = 'username';

  public get name(): any {

    return this.storage[this.nameKey];
  }

  public set name(value: any) {

    this.storage[this.nameKey] = value;
  }

  // User ///////////////////////////////////////

  public unsetUser() {
    this.setUser(null, null);
  }

  public setUser(name: string, token: string): void {

    this.name = name;
    this.token = token;
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

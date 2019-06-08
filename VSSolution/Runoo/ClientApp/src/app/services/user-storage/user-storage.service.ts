import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserStorageService {

  get isAuth(): boolean {
    return !!this.userName;
  }

  private authSubject: Subject<boolean>;
  authChanged: Observable<boolean>;
  storage: Storage;

  constructor() {

    this.authSubject = new Subject<boolean>();
    this.authChanged = this.authSubject.asObservable();
    this.storage = window.localStorage;
    window.addEventListener("storage", () => this.updateAuth());
  }

  signIn(model: { userName: string, avatarPath: string, birthDate: string, teams: { teamName: string, teamMemberRoleTK: string }[] }) {
    this.userName = model.userName;
    this.avatarPath = model.avatarPath;
    this.birthDate = model.birthDate;
    this.teams = model.teams;
  }
  signOut() {
    this.userName = null;
    this.avatarPath = null;
    this.birthDate = null;
    this.teams = null;
  }

  get userName(): string {

    return this.getItem('userName');
  }
  set userName(value: string) {

    this.saveItem('userName', value);
  }

  get avatarPath(): string {

    return this.getItem('avatarPath');
  }
  set avatarPath(value: string) {

    this.saveItem('avatarPath', value);
  }

  get birthDate(): string {

    return this.getItem('birthDate');
  }
  set birthDate(value: string) {

    this.saveItem('birthDate', value);
  }

  get teams(): {teamName: string, teamMemberRoleTK: string}[] {

    return JSON.parse(this.getItem('teams'));
  }
  set teams(value: { teamName: string, teamMemberRoleTK: string }[]) {

    this.saveItem('teams', JSON.stringify(value));
  }

  saveItem(key:string, value: string) {

    if (value)
      this.storage.setItem(key, value);
    else
      this.storage.removeItem(key);
    
    this.authSubject.next(this.isAuth);
  }
  getItem(key: string): string {

    if (!this.storage[key])
      return null;

    return this.storage[key];
  }

  updateAuth(): void { }
}

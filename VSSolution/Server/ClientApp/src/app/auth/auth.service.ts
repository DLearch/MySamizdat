import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';

@Injectable()
export class AuthService {
  
  get isAuth(): boolean {
    return this.userStorage.token != null;
  }

  constructor(
    private userStorage: UserStorageService
  ) {
    window.addEventListener("storage", () => this.updateAuth());
  }

  signIn(userName: string, token: string): void {

    this.userStorage.token = token;
    this.userStorage.userName = userName;
  }
  signOut(): void {

    this.userStorage.token = null;
  }
  
  updateAuth(): void { }
  
}

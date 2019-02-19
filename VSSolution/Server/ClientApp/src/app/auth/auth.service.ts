import { Injectable } from '@angular/core';
import { UserStorageService } from './user-storage.service';
import { DialogWindowService } from '../layout/dialog-window/dialog-window.service';

@Injectable()
export class AuthService {
  
  get isAuth(): boolean {
    return this.userStorage.token != null;
  }

  constructor(
    private userStorage: UserStorageService,
    private dialogWindow: DialogWindowService
  ) {

    window.addEventListener("storage", () => this.updateAuth());
  }
  
  signOut(): void {

    this.userStorage.token = null;
  }
  
  updateAuth(): void { }
}

import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' = null;
  @Input() design: 'raised' | 'fab' | 'icon' | 'avatar';
  private _image = null;
  @Input() set imagePath(value: string) {
    let result = value;
    if (result)
      while (result.indexOf('\\') != -1)
        result = result.replace('\\', '/');
    this._image = result;
  }
  get imagePath(): string {
    return this._image;
  }
  @Input() userName: string = null;
  @Input() disabled: boolean = false;

  @Output() authClick = new EventEmitter<any>();
  @Output() simpleClick = new EventEmitter<any>();

  constructor(
    private userStorage: UserStorageService,
    private config: ConfigurationService,
    private router: Router
  ) { }

  getImagePath(): string {

    if (this.imagePath)
      return this.imagePath;

    return this.config.getString('defaultAvatarPath');
  }

  onClick($event): void {

    if (this.simpleClick.observers.length)
      this.simpleClick.emit($event);

    if (this.authClick.observers.length)
      if (!this.userStorage.isAuth)
        this.router.navigate(['/sign-in']);
      else
        this.authClick.emit($event);
  }
}

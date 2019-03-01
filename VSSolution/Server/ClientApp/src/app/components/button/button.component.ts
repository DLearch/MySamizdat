import { Component, Input, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' = null;
  @Input() design: 'raised' | 'fab' | 'icon';

  @Output() authClick = new EventEmitter<any>();
  @Output() simpleClick = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onClick($event): void {
    
    if (this.simpleClick.observers.length)
      this.simpleClick.emit($event);

    if (this.authClick.observers.length)
      if (!this.authService.isAuth)
        this.router.navigate(['/sign-in']);
      else
        this.authClick.emit($event);
  }
}

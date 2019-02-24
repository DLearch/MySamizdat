import { Component, Input } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  
  @Input() path: string = null;
  error: boolean = false;

  get fullPath(): string {
    
    return this.config.getString('url') + (this.path && !this.error ? this.path : this.config.getString('defaultAvatarPath'));
  }
  constructor(
    private config: ConfigurationService
  ) { }

  handleError(event: any): void {
    this.error = true;
  }
}

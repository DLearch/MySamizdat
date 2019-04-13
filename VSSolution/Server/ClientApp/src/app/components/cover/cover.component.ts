import { Component, Input } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent {

  @Input() path: string = null;
  @Input() design: 'mini' = null;
  error: boolean = false;

  get fullPath(): string {

    return (this.path && !this.error ? this.path : this.config.getString('defaultAvatarPath'));
  }
  constructor(
    private config: ConfigurationService
  ) { }

  handleError(event: any): void {
    this.error = true;
  }

}

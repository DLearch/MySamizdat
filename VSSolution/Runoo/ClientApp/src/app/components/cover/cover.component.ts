import { Component, Input } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';

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

    return (this.path && !this.error ? this.path : this.config.getString('defaultCoverPath'));
  }
  constructor(
    private config: ConfigService
  ) { }

  handleError(event: any): void {
    this.error = true;
  }
}

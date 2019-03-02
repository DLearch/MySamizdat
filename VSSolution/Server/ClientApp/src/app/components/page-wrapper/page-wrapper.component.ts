import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.css']
})
export class PageWrapperComponent {
  
  @Input() set title(value: string) {
    this.titleService.setTitle(value);
  }

  @Input() maxWidth: string = '1000px';
  @Input() alighCenter: boolean = true;
  @Input() minMargin: string = '16px';
  @Input() loaded: boolean = true;

  constructor(
    private titleService: Title
  ) { }
}

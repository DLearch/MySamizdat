import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-overlay',
  templateUrl: './load-overlay.component.html',
  styleUrls: ['./load-overlay.component.css']
})
export class LoadOverlayComponent {

  @Input() textTK: string;

}

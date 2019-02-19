import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-load',
  templateUrl: './image-load.component.html',
  styleUrls: ['./image-load.component.css']
})
export class ImageLoadComponent {

  @Input() fieldTK: string;
  @Input() field: FormControl;

  constructor() { }
  
}

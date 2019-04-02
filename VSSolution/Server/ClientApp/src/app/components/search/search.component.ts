import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  formTemplate: InputTemplate[];
  formErrors: any = null;

  @Input() value: string;
  @Output() valueChanged = new EventEmitter<string>();
  @Output() onSearch = new EventEmitter<string>();

  constructor() {

    this.formTemplate = [
      {
        name: 'search',
        tk: 'search'
      }
    ];
  }
  
  search(value: string) {
    this.onSearch.emit(value);
  }
}

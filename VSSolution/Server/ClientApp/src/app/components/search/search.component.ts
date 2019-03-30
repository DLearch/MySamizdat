import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('form') form: FormComponent;

  formTemplate: InputTemplate[];
  formErrors: any = null;

  @Input() set value(value: string) {

    this.formTemplate = [
      {
        name: 'search',
        tk: 'search',
        value: value
      }
    ];
  }
  get value(): string {
    return this.form.form.value.search;
  }
  @Output() valueChange = new EventEmitter<string>();

  constructor() {

    this.formTemplate = [
      {
        name: 'search',
        tk: 'search'
      }
    ];
  }
  
  onSearch(model: string) {

    this.value = model;
    this.valueChange.emit(model);
  }
}

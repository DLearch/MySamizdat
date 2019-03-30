import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Filter } from './filter';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

  componentTK = 'component.filters.';

  @Input() formTemplate = [];

  @Output() onApply = new EventEmitter<Filter[]>();
  
  apply(form: FormGroup) {

    let filters: Filter[] = [];
    
    for (let filter in form.value)
      if (form.value[filter])
        filters.push({ type: filter, value: form.value[filter] });
    
    this.onApply.emit(filters);
  }

  reset(form: FormGroup) {

    form.reset();

    this.onApply.emit([]);
  }
}

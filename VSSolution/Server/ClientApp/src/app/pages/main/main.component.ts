import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
import { ControlTemplate } from 'src/app/components/form/control-template';
import { AppValidators } from 'src/app/app-validators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  template: ControlTemplate[];

  constructor(
    private translate: TranslateService
  ) {
    this.template = [];

    this.template.push({
      name: 'username',
      tk: 'username',
      validators: [Validators.required, AppValidators.userName] 
    });
    this.template.push({
      name: 'languageTK',
      tk: 'language',
      type: 'select',
      validators: [Validators.required],
      selectElements: [{ value: 'ru', tk: 'language.ru' }, { value: 'en', tk: 'language.en' }]
    });
  }

  ngOnInit() {
  }
  click(asd) {
    console.log(asd);
    
  }
}

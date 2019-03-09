import { Component } from '@angular/core';
import { ThemePickerService } from '../theme-picker/theme-picker.service';
import { PageServiceService } from 'src/app/services/page-service/page-service.service';
import { BreakPointService } from 'src/app/services/break-point/break-point.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {
  
  constructor(
    private themePickerService: ThemePickerService,
    private pageService: PageServiceService,
    private breakpointService: BreakPointService
  ) { }
}

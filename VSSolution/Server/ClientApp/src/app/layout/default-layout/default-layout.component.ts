import { Component } from '@angular/core';
import { ThemePickerService } from '../theme-picker/theme-picker.service';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent {

  componentTK = 'component.default-layout.';

  constructor(
    private themePickerService: ThemePickerService,
    private breakpointService: BreakpointService,
    private pageService: PageService
  ) { }
}

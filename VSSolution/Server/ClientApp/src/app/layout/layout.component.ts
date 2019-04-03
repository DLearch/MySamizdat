import { Component } from '@angular/core';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';
import { ThemePickerService } from './theme-picker/theme-picker.service';
import { PageService } from '../services/page/page.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  componentTK = 'layout.';

  constructor(
    private breakpointService: BreakpointService,
    private pageService: PageService
  ) { }

  sidenavClick(sidenav: MatSidenav) {
    if (this.breakpointService.level < 3)
      sidenav.close();
  }
}

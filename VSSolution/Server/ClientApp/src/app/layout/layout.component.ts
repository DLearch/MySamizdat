import { Component } from '@angular/core';
import { BreakpointService } from '../services/breakpoint/breakpoint.service';
import { PageService } from '../services/page/page.service';
import { MatSidenav } from '@angular/material';
import { UserStorageService } from '../services/user-storage/user-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  host: {
    'class': 'mat-app-background'
  }
})
export class LayoutComponent {

  componentTK = 'layout.';

  readonly links: { path: string, tKey: string }[] = [
    { path: "/", tKey: "main" },
    { path: "/books", tKey: "catalog" }
  ];

  readonly authLinks: { path: string | string[], tKey: string }[] = [
    { path: "/bookmarks", tKey: "bookmarks" },
    { path: ['/user', this.userStorage.userName], tKey: "account" }
  ];

  get isDesktop(): boolean {
    return this.breakpoint.level >= 4;
  }

  constructor(
    private breakpoint: BreakpointService,
    private userStorage: UserStorageService,
    private pageService: PageService
  ) { }
}

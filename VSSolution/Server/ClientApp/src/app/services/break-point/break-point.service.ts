import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable()
export class BreakPointService {

  xSmall: boolean = true;
  small: boolean = false;
  medium: boolean = false;
  large: boolean = false;
  xLarge: boolean = false;


  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe((state: BreakpointState) => {

        this.xSmall = state.breakpoints[Breakpoints.XSmall];
        this.small = state.breakpoints[Breakpoints.Small];
        this.medium = state.breakpoints[Breakpoints.Medium];
        this.large = state.breakpoints[Breakpoints.Large];
        this.xLarge = state.breakpoints[Breakpoints.XLarge];

        console.log(this);
      });
  }
}

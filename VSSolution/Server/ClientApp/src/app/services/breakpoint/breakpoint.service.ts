import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable()
export class BreakpointService {

  level: number = 0;

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

        if (state.breakpoints[Breakpoints.XSmall])
          this.level = 0;
        else if (state.breakpoints[Breakpoints.Small])
          this.level = 1;
        else if (state.breakpoints[Breakpoints.Medium])
          this.level = 2;
        else if (state.breakpoints[Breakpoints.Large])
          this.level = 3;
        else if (state.breakpoints[Breakpoints.XLarge])
          this.level = 4;

        //this.xSmall = this.level >= 0;
        this.small = this.level >= 1;
        this.medium = this.level >= 2;
        this.large = this.level >= 3;
        this.xLarge = this.level >= 4;

        console.log(this.level);
      });
  }
}

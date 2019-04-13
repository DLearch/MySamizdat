import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable()
export class BreakpointService {
  
  readonly breakpoints: string[] = [
    '(max-width: 399.99px)',
    '(min-width: 400px) and (max-width: 599.99px)',
    '(min-width: 600px) and (max-width: 799.99px)',
    '(min-width: 800px) and (max-width: 999.99px)',
    '(min-width: 1000px) and (max-width: 1199.99px)',
    '(min-width: 1200px) and (max-width: 1399.99px)',
    '(min-width: 1400px) and (max-width: 1599.99px)',
    '(min-width: 1600px)'
  ];

  level: number = 0;
  
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {

    for (let breakpoint of this.breakpoints) {
      this.breakpointObserver
        .observe(breakpoint)
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.level = this.breakpoints.indexOf(breakpoint);
          }
        });
    }
  }
}

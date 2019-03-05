import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  code: string;
  error: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(data => {
        this.error = data.error;
        this.code = data.code;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

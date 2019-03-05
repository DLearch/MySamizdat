import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  componentTK = 'component.error.';

  errorTK: string;
  descriptionTK: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(data => {
        this.errorTK = data.errorTK;
        this.descriptionTK = data.descriptionTK;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

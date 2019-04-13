import { Component, OnInit, Input } from '@angular/core';
import { ErrorPageData } from 'src/app/services/page/error-page-data';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  componentTK = 'page.error.';

  @Input() errorData: ErrorPageData;

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService
  ) { }

  ngOnInit() {

    if (!this.errorData)
      this.subscribeRouteErrorData();
  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  subscribeRouteErrorData() {

    this.sub = this.route
      .data
      .subscribe((data: ErrorPageData) => {

        this.errorData = data;

        if (data.errorTK)
          this.pageService.setTitleTK(data.errorTK);
        else if (data.error)
          this.pageService.setTitle(data.error);
        else
          this.pageService.setTitleTK(this.componentTK + 'error');
      });
  }
}

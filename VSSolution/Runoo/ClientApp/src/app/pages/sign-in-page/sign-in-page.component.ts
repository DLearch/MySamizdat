import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent {

  componentTK = 'page.sign-in.';

  constructor(
    private pageService: PageService,
    private router: Router
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  onLoad(loaded: boolean) {
    this.pageService.loaded = loaded;
  }

  onSubmit(result: boolean) {

    if (result)
      this.router.navigate(['/']);
  }
}

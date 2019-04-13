import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  componentTK = 'page.sign-up.'

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

import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-new-team-page',
  templateUrl: './new-team-page.component.html',
  styleUrls: ['./new-team-page.component.css']
})
export class NewTeamPageComponent {

  componentTK = 'page.new-team.';

  constructor(
    private pageService: PageService
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  onLoad(loaded: boolean) {
    this.pageService.loaded = loaded;
  }

  onSubmit(result: boolean) {
    
  }
}

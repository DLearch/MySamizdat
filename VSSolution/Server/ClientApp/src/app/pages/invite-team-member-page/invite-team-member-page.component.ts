import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invite-team-member-page',
  templateUrl: './invite-team-member-page.component.html',
  styleUrls: ['./invite-team-member-page.component.css']
})
export class InviteTeamMemberPageComponent {

  componentTK = 'page.invite-team-member.';

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
  }

  onLoad(loaded: boolean) {
    this.pageService.loaded = loaded;
  }

  onSubmit(result: boolean) {

    if (result)
      this.router.navigate(['/team', this.route.snapshot.paramMap.get('team')]);
  }
}

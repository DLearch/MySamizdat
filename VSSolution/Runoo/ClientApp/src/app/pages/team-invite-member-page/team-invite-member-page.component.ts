import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-invite-member-page',
  templateUrl: './team-invite-member-page.component.html',
  styleUrls: ['./team-invite-member-page.component.css']
})
export class TeamInviteMemberPageComponent {

  componentTK = 'page.team-invite-member.';

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

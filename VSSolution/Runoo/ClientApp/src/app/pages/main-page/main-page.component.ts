import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    console.log(this.translate.instant('count.book.none'));
    //let model = {
    //  userName: "Qwert1",
    //  email: "larch.dn@gmail.com",
    //  password: "1qaz@WSX"
    //};

    //this.api
    //  .post(model, 'auth', 'login')
    //  .subscribe(() => {

    //    console.log(document.cookie);
    //    console.log(document);
    //  });
  }

  ngOnInit() {
    

  }

}

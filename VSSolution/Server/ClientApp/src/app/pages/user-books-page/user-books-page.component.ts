import { Component, OnInit } from '@angular/core';
import { InputTemplate } from 'src/app/components/form/input-template';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { PageService } from 'src/app/services/page/page.service';
import { ActivatedRoute } from '@angular/router';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';

@Component({
  selector: 'app-user-books-page',
  templateUrl: './user-books-page.component.html',
  styleUrls: ['./user-books-page.component.css']
})
export class UserBooksPageComponent implements OnInit {

  books: any[] = null;
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private bookController: BookControllerService
  ) {
    this.filtersTemplate = [
    ];

    this.pageService.loaded = true;
  }

  ngOnInit() {

    this.update();
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: null }) {

    const userName: string = this.route.snapshot.paramMap.get('user');

    this.books = null;

    this.bookController.getUserBooks(userName, event).subscribe(response => {

      this.books = response.books;

      this.event = {
        length: response.length,
        pageSize: event.pageSize,
        pageIndex: response.page,
        filters: event.filters
      };

    }, response => {

      this.pageService.error = { descriptionTK: 'error.unknown' };
    })
  }
}

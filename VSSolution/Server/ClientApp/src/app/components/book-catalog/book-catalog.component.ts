import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css'],
  host: {
    'class': 'page'
  }
})
export class BookCatalogComponent implements OnInit {

  @Output() loaded = new EventEmitter<boolean>();

  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;
  books: { id: number, title: string }[];

  constructor(
    private route: ActivatedRoute,
    private catalogController: CatalogControllerService
  ) {
    this.loaded.emit(false);
  }

  ngOnInit() {

    this.updatePage({ pageSize: this.pageSize, pageIndex: this.pageIndex, length: this.length, previousPageIndex: 0 });
  }

  updatePage(event: PageEvent): void {

    this.loaded.emit(false);

    this.catalogController
      .getPage(event.pageIndex, event.pageSize)
      .subscribe(
        response => {
          this.length = response.length;
          this.pageIndex = response.page;
          this.books = response.books;
          this.loaded.emit(true);
        }
      );
  }
}

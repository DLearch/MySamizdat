import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  host: {
    'class': 'component content'
  }
})
export class CatalogComponent implements OnInit {
  
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;
  books: Book[];

  constructor(
    private bookService: BookService
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let page: number = +this.route.snapshot.paramMap.get('page');

    if (page && page > 0)
      this.pageIndex = page - 1;

    this.updatePage({ pageSize: this.pageSize, pageIndex: this.pageIndex, length: this.length, previousPageIndex: 0 });
  }

  updatePage(event: PageEvent): void {

    this.bookService
      .getCatalog(event.pageSize, event.pageIndex)
      .subscribe(
        response => {
          this.length = response.length;
          this.books = response.books;
          
        }
      );
  }
}

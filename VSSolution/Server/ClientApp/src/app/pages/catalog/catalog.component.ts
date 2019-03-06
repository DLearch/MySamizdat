import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CatalogControllerService } from 'src/app/api-services/catalog-controller/catalog-controller.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  host: {
    'class': 'page'
  }
})
export class CatalogComponent implements OnInit {
  
  pageIndex: number = 0;
  pageSize: number = 10;
  length: number = 0;
  books: { id: number, title: string }[];

  constructor(
    private route: ActivatedRoute,
    private catalogController: CatalogControllerService
  ) { }

  ngOnInit() {
    
    this.updatePage({ pageSize: this.pageSize, pageIndex: this.pageIndex, length: this.length, previousPageIndex: 0 });
  }

  updatePage(event: PageEvent): void {

    this.catalogController
      .getPage(event.pageIndex, event.pageSize)
      .subscribe(
        response => {
          this.length = response.length;
          this.pageIndex = response.page;
          this.books = response.books;
        }
      );
  }
}

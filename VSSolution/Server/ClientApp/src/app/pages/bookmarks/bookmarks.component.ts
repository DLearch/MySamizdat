import { Component, OnInit } from '@angular/core';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmarks: Bookmark[];

  constructor(
    private service: BookmarksService
  ) { }

  ngOnInit() {
    this.service.get().subscribe(bookmarks => this.bookmarks = bookmarks);
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateVM } from './create-vm';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';

@Injectable()
export class NewBookService {

  constructor(
    private bookController: BookControllerService
  ) { }

  create(model: CreateVM): Observable<number> {
    return this.bookController.addBook(model.title);
  }
}

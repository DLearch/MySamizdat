import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogPageComponent } from './book-catalog-page.component';

describe('BookCatalogPageComponent', () => {
  let component: BookCatalogPageComponent;
  let fixture: ComponentFixture<BookCatalogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCatalogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

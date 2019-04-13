import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookPageComponent } from './update-book-page.component';

describe('UpdateBookPageComponent', () => {
  let component: UpdateBookPageComponent;
  let fixture: ComponentFixture<UpdateBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

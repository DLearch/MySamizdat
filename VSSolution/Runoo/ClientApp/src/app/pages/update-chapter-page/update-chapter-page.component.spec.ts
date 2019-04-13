import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChapterPageComponent } from './update-chapter-page.component';

describe('UpdateChapterPageComponent', () => {
  let component: UpdateChapterPageComponent;
  let fixture: ComponentFixture<UpdateChapterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChapterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChapterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

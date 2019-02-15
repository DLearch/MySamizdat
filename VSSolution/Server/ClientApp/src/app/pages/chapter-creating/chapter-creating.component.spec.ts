import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterCreatingComponent } from './chapter-creating.component';

describe('ChapterCreatingComponent', () => {
  let component: ChapterCreatingComponent;
  let fixture: ComponentFixture<ChapterCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

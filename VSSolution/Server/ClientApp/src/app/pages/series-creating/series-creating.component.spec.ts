import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesCreatingComponent } from './series-creating.component';

describe('SeriesCreatingComponent', () => {
  let component: SeriesCreatingComponent;
  let fixture: ComponentFixture<SeriesCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookTeamDialogComponent } from './change-book-team-dialog.component';

describe('ChangeBookTeamDialogComponent', () => {
  let component: ChangeBookTeamDialogComponent;
  let fixture: ComponentFixture<ChangeBookTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBookTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBookTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

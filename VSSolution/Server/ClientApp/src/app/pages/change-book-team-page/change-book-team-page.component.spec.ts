import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookTeamPageComponent } from './change-book-team-page.component';

describe('ChangeBookTeamPageComponent', () => {
  let component: ChangeBookTeamPageComponent;
  let fixture: ComponentFixture<ChangeBookTeamPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeBookTeamPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBookTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

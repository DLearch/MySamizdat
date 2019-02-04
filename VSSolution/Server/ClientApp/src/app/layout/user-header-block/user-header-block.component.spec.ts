import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderBlockComponent } from './user-header-block.component';

describe('UserHeaderBlockComponent', () => {
  let component: UserHeaderBlockComponent;
  let fixture: ComponentFixture<UserHeaderBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

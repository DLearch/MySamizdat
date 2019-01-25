import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUnconfirmedComponent } from './email-unconfirmed.component';

describe('EmailUnconfirmedComponent', () => {
  let component: EmailUnconfirmedComponent;
  let fixture: ComponentFixture<EmailUnconfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailUnconfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailUnconfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

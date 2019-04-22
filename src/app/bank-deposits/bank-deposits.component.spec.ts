import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDepositsComponent } from './bank-deposits.component';

describe('BankDepositsComponent', () => {
  let component: BankDepositsComponent;
  let fixture: ComponentFixture<BankDepositsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankDepositsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

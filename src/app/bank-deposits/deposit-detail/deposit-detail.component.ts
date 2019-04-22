import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BankDepositsService } from '../bank-deposits.service';
import { combineLatest } from 'rxjs';
import { Deposit } from '../bank-deposit.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss']
})
export class DepositDetailComponent implements OnInit {

  public deposit: Deposit;

  constructor(
    private route: ActivatedRoute,
    private bankDepositService: BankDepositsService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.bankDepositService.getDeposit(params['id']);
        }
      )
    ).subscribe(
      (deposit: Deposit) => {
        this.deposit = deposit;
      }
    );
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BankDepositsService } from '../bank-deposits.service';
import { combineLatest, Subscription } from 'rxjs';
import { Deposit } from '../bank-deposit.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss']
})
export class DepositDetailComponent implements OnInit, OnDestroy {

  public deposit: Deposit;
  public loadingContent: boolean;
  private accountSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bankDepositService: BankDepositsService
  ) { }

  getLoadingContent() {
    return this.bankDepositService.getLoadingContent();
  }

  ngOnInit() {

    this.accountSubscription = this.bankDepositService.$savingDeipsit.subscribe(
      (deposit: Deposit) => {
        this.deposit = deposit;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.bankDepositService.getDeposit(params['id']);
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}

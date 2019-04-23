import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Account } from '../account.model';
import { SavingAccountsService } from '../saving-accounts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

  public account: Account;
  private accountSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private savingAccountsService: SavingAccountsService
  ) { }

  getLoadingContent() {
    return this.savingAccountsService.getLoadingContent();
  }

  ngOnInit() {
    this.accountSubscription = this.savingAccountsService.$savingAccount.subscribe(
      (account: Account) => {
        this.account = account;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.savingAccountsService.getAccount(params['id']);
      }
    );
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }
}

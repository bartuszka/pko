import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Account } from '../account.model';
import { SavingAccountsService } from '../saving-accounts.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  public account: Account;

  constructor(
    private route: ActivatedRoute,
    private savingAccountsService: SavingAccountsService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.savingAccountsService.getAccount(params['id']);
        }
      )
    ).subscribe(
      (account: Account) => {
        this.account = account;
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Account } from './account.model';
import { ServerTasksService } from '../shared/services/server-tasks.service';
import { ErrorHandlingService, Errors } from '../shared/services/error-handling.service';

@Injectable()
export class SavingAccountsService {

  private savingAccounts: Account[] = [];

  private savingAccountsSubject: Subject<Account[]> = new Subject();
  public $savingAccounts: Observable<Account[]> = this.savingAccountsSubject.asObservable();
  private savingAccountSubject: Subject<Account> = new Subject();
  public $savingAccount: Observable<Account> = this.savingAccountSubject.asObservable();
  private loadingContent: boolean = false;

  constructor(
    private serverTasksService: ServerTasksService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  public fetchAccounts(): void {
    this.loadingContent = true;
    this.serverTasksService.getAccounts().subscribe(
      (accountsData: {message: string, savingAccounts: Account[]}) => {
        this.savingAccounts = accountsData.savingAccounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.AccountListError);
        this.loadingContent = false;
      }
    );
  }

  public getAccount(accountId: string): void {
    this.loadingContent = true;
    this.serverTasksService.getAccount(accountId).subscribe(
      (account: Account) => {
        this.savingAccountSubject.next(account);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.AccountError);
        this.loadingContent = false;
      }
    );
  }

  public removeAccount(accountId: string): void {
    this.loadingContent = true;
    this.serverTasksService.removeAccount(accountId).subscribe(
      () => {
        const updatedAccounts = this.savingAccounts.filter((account: Account) => account.id !== accountId);
        this.savingAccounts = updatedAccounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.AcountDeleteError);
        this.loadingContent = false;
      }
    );
  }

  public addRandomAccount(): void {
    this.loadingContent = true;
    const newAccount: Account = this.generateRandomAccount();
    this.serverTasksService.addRandomAccount(newAccount).subscribe(
      (responseData: {message: string, accountId: string}) => {
        newAccount.id = responseData.accountId;
        this.savingAccounts.push(newAccount);
        this.savingAccountsSubject.next([...this.savingAccounts]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.AccountSaveError);
        this.loadingContent = false;
      }
    );
  }

  private generateRandomAccount(): Account {
    const possibleChars: string = '1234567890';
    let newAccountNum: string = '';
    const newAccountSum: number = Math.floor(100 + Math.random() * 900);
    const newAccountInterest: number = Math.floor(1 + Math.random() * 9);

    for (let i = 0; i < 26; i++) {
      if (i === 2 || (i + 2) % 4 === 0) {
        newAccountNum += ' ';
      }
      newAccountNum += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    const newAccount: Account = {
      id: null,
      accountNumber: newAccountNum,
      accountSum: newAccountSum,
      accountInterest: newAccountInterest
    };

    return newAccount;
  }

  public getLoadingContent(): boolean {
    return this.loadingContent;
  }
}

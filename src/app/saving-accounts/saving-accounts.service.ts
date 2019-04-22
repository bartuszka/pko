import { Injectable } from '@angular/core';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { Account } from './account.model';
import { ServerTasksService } from '../shared/services/server-tasks.service';

@Injectable()
export class SavingAccountsService {

  private savingAccounts: Account[] = [];

  private savingAccountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject([]);
  public $savingAccounts: Observable<Account[]> = this.savingAccountsSubject.asObservable();

  constructor(private serverTasksService: ServerTasksService) {}

  public fetchAccounts(): void {
    this.serverTasksService.getAccounts().subscribe(
      (accountsData: {message: string, savingAccounts: Account[]}) => {
        this.savingAccounts = accountsData.savingAccounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
      }
    );
  }

  public getAccount(accountId: string) {
    return this.serverTasksService.getAccount(accountId);
  }

  public removeAccount(accountId: string) {
    return this.serverTasksService.removeAccount(accountId).subscribe(
      () => {
        const updatedAccounts = this.savingAccounts.filter((account: Account) => account.id !== accountId);
        this.savingAccounts = updatedAccounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
      }
    );
  }

  public addRandomAccount() {
    const newAccount = this.generateRandomAccount();
    this.serverTasksService.addRandomAccount(newAccount).subscribe(
      (responseData: {message: string, accountId: string}) => {
        newAccount.id = responseData.accountId;
        this.savingAccounts.push(newAccount);
        this.savingAccountsSubject.next([...this.savingAccounts]);
      }
    );
  }

  private generateRandomAccount() {
    const possibleChars = '1234567890';
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
}

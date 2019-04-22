import { Injectable } from '@angular/core';
import { of, Subject, Observable, BehaviorSubject } from 'rxjs';
import { Account } from './account.model';

@Injectable()
export class SavingAccountsService {

  private savingAccounts: Account[] = [];

  private savingAccountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject([]);
  public $savingAccounts: Observable<Account[]> = this.savingAccountsSubject.asObservable();

  private serverAccounts: Account[] = [
    new Account('af124', '12 1234 1234 1234 1234 1234 1234', 2050, 3),
    new Account('cv325', '06 4567 4567 4567 4567 4567 4567', 1258, 2),
    new Account('fgh12', '76 1375 1375 1375 1375 1375 1375', 7597, 4)
  ];

  getAccounts(): void {
    of(this.serverAccounts).subscribe(
      (accounts: Account[]) => {
        this.savingAccounts = accounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
      }
    );
  }

  deleteAccount(accountId: string): void {
    of(this.serverAccounts).subscribe(
      (accounts: Account[]) => {
        const updatedAccounts = this.savingAccounts.filter(
          (account: Account) => account.getId() !== accountId);
        this.savingAccounts = updatedAccounts;
        this.savingAccountsSubject.next([...this.savingAccounts]);
      }
    );
  }

  getAccount(accountId: string) {
    return this.savingAccounts.find(
      (account: Account) => account.getId() === accountId
    );
  }
}

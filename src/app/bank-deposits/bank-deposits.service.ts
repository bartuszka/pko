import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Deposit } from './deposit.model';

@Injectable()
export class BankDepositsService {

  private savingDeipsits: Deposit[] = [];

  private savingDeipsitsSubject: BehaviorSubject<Deposit[]> = new BehaviorSubject([]);
  public $savingDeipsits: Observable<Deposit[]> = this.savingDeipsitsSubject.asObservable();

  private serverAccounts: Deposit[] = [
    new Deposit('aaaa', '12 1234 1234 1234 1234 1234 1234', 212, 1),
    new Deposit('bbbb', '06 4567 4567 4567 4567 4567 4567', 555, 2),
    new Deposit('cccc', '76 1375 1375 1375 1375 1375 1375', 5678, 5)
  ];

  getDeposits(): void {
    of(this.serverAccounts).subscribe(
      (deposits: Deposit[]) => {
        this.savingDeipsits = deposits;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
      }
    );
  }

  deleteDeposit(accountId: string): void {
    of(this.serverAccounts).subscribe(
      (accounts: Deposit[]) => {
        const updatedAccounts = this.savingDeipsits.filter(
          (account: Deposit) => account.getId() !== accountId);
        this.savingDeipsits = updatedAccounts;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
      }
    );
  }

  getDeposit(accountId: string) {
    return this.savingDeipsits.find(
      (deposit: Deposit) => deposit.getId() === accountId
    );
  }
}

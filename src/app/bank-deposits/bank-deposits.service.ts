import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deposit } from './bank-deposit.model';
import { ServerTasksService } from '../shared/services/server-tasks.service';

@Injectable()
export class BankDepositsService {

  private savingDeipsits: Deposit[] = [];

  private savingDeipsitsSubject: BehaviorSubject<Deposit[]> = new BehaviorSubject([]);
  public $savingDeipsits: Observable<Deposit[]> = this.savingDeipsitsSubject.asObservable();

  constructor(private serverTasksService: ServerTasksService) {}

  fetchDeposits(): void {
    this.serverTasksService.getDeposits().subscribe(
      (depositsData: {message: string, currentDeposits: Deposit[]}) => {
        this.savingDeipsits = depositsData.currentDeposits;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
      }
    );
  }

  removeDeposit(depositId: string): void {
    this.serverTasksService.removeDeposit(depositId).subscribe(
      () => {
        const updatedDeposits = this.savingDeipsits.filter((deposit: Deposit) => deposit.id !== depositId);
        this.savingDeipsits = updatedDeposits;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
      }
    );
  }

  public getDeposit(depositId: string) {
    return this.serverTasksService.getDeposit(depositId);
  }

  private generateRandomDeposit(): Deposit {
    const possibleChars = '1234567890';
    let newDepositNum: string = '';
    const newDepositSum: number = Math.floor(100 + Math.random() * 900);
    const newDepositInterest: number = Math.floor(1 + Math.random() * 9);

    for (let i = 0; i < 26; i++) {
      if (i === 2 || (i + 2) % 4 === 0) {
        newDepositNum += ' ';
      }
      newDepositNum += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    const newDeposit: Deposit = {
      id: null,
      depositNumber: newDepositNum,
      depositSum: newDepositSum,
      depositInterest: newDepositInterest
    };

    return newDeposit;
  }

  public addRandomDeposit() {
    const newDeposit: Deposit = this.generateRandomDeposit();
    this.serverTasksService.addRandomDeposit(newDeposit).subscribe(
      (responseData: {message: string, depositId: string}) => {
        newDeposit.id = responseData.depositId;
        this.savingDeipsits.push(newDeposit);
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Deposit } from './bank-deposit.model';
import { ServerTasksService } from '../shared/services/server-tasks.service';
import { ErrorHandlingService, Errors } from '../shared/services/error-handling.service';

@Injectable()
export class BankDepositsService {

  private savingDeipsits: Deposit[] = [];

  private savingDeipsitsSubject: Subject<Deposit[]> = new Subject();
  public $savingDeipsits: Observable<Deposit[]> = this.savingDeipsitsSubject.asObservable();
  private savingDeipsitSubject: Subject<Deposit> = new Subject();
  public $savingDeipsit: Observable<Deposit> = this.savingDeipsitSubject.asObservable();
  private loadingContent: boolean = false;

  constructor(
    private serverTasksService: ServerTasksService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  fetchDeposits(): void {
    this.loadingContent = true;
    this.serverTasksService.getDeposits().subscribe(
      (depositsData: {message: string, currentDeposits: Deposit[]}) => {
        this.savingDeipsits = depositsData.currentDeposits;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.DepositListError);
        this.loadingContent = false;
      }
    );
  }

  removeDeposit(depositId: string): void {
    this.loadingContent = true;
    this.serverTasksService.removeDeposit(depositId).subscribe(
      () => {
        const updatedDeposits = this.savingDeipsits.filter((deposit: Deposit) => deposit.id !== depositId);
        this.savingDeipsits = updatedDeposits;
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.DepositDeleteError);
        this.loadingContent = false;
      }
    );
  }

  public getDeposit(depositId: string): void {
    this.loadingContent = true;
    this.serverTasksService.getDeposit(depositId).subscribe(
      (deposit: Deposit) => {
        this.savingDeipsitSubject.next(deposit);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.DepositError);
        this.loadingContent = false;
      }
    );
  }

  public addRandomDeposit(): void {
    this.loadingContent = true;
    const newDeposit: Deposit = this.generateRandomDeposit();
    this.serverTasksService.addRandomDeposit(newDeposit).subscribe(
      (responseData: {message: string, depositId: string}) => {
        newDeposit.id = responseData.depositId;
        this.savingDeipsits.push(newDeposit);
        this.savingDeipsitsSubject.next([...this.savingDeipsits]);
        this.loadingContent = false;
      },
      error => {
        this.errorHandlingService.dispatchError(Errors.DepositSaveError);
        this.loadingContent = false;
      }
    );
  }

  private generateRandomDeposit(): Deposit {
    const possibleChars: string = '1234567890';
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

  public getLoadingContent(): boolean {
    return this.loadingContent;
  }
}

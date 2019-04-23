import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export enum Errors {
  AccountListError = 'Nie udało się pobrać listy rachunków',
  DepositListError = 'Nie udało się pobrać listy lokat',
  AccountSaveError = 'Nie udało się zapisać rachunku',
  DepositSaveError = 'Nie udało się zapisać lokaty',
  AccountError = 'Nie udało się pobrać rachunku',
  DepositError = 'Nie udało się pobrać lokaty',
  AcountDeleteError = 'Nie udało się usunąć rachunku',
  DepositDeleteError = 'Nie udało się usunąć lokaty'
}

@Injectable()
export class ErrorHandlingService {
  private errorSubject: Subject<Error> = new Subject();
  public $error: Observable<Error> = this.errorSubject.asObservable();

  public dispatchError(message: string): void {
    this.errorSubject.next(new Error(message));
  }
}

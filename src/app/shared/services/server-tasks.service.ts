import { Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Account } from 'src/app/saving-accounts/account.model';
import { Injectable } from '@angular/core';
import { Deposit } from 'src/app/bank-deposits/bank-deposit.model';

@Injectable()
export class ServerTasksService {
  private appInitialized: boolean = false;

  constructor(private httpClient: HttpClient) {}

  public getApplicationInit(): boolean | Observable<boolean> {
    if (this.appInitialized) {
      return true;
    } else {
      return this.httpClient.get<{init: boolean}>('/application/init').pipe(
        tap(
          (appInitData: {init: boolean}) => {
            this.appInitialized = appInitData.init;
          }
        ),
        map(
          (appInitData: {init: boolean}) => {
            return appInitData.init;
          }
        )
      );
    }
  }

  public getAppInitialized(): boolean {
    return this.appInitialized;
  }

  public getAccounts() {
    return this.httpClient.get<{message: string, savingAccounts: Account[]}>('/application/currentAccounts').pipe(
      map(
        (serverData: {message: string, savingAccounts: any[]}) => {
          const updatedAccounts: Account[] = serverData.savingAccounts.map(
            (account: any) => {
              return {
                id: account._id,
                accountNumber: account.accountNumber,
                accountSum: account.accountSum,
                accountInterest: account.accountInterest
              };
            }
          );
          serverData.savingAccounts = updatedAccounts;
          return serverData;
        }
      )
    );
  }

  public getDeposits() {
    return this.httpClient.get<{message: string, currentDeposits: Deposit[]}>('/application/termDeposits').pipe(
      map(
        (serverData: {message: string, currentDeposits: any[]}) => {
          const updatedDeposits: Deposit[] = serverData.currentDeposits.map(
            (deposit: any) => {
              return {
                id: deposit._id,
                depositNumber: deposit.depositNumber,
                depositSum: deposit.depositSum,
                depositInterest: deposit.depositInterest
              };
            }
          );
          serverData.currentDeposits = updatedDeposits;
          return serverData;
        }
      )
    );
  }

  public getAccount(accountId: string) {
    return this.httpClient.get<{message: string, account: any}>('/application/currentAccounts/' + accountId).pipe(
      map(
        (account: any) => {
          return {
            id: account._id,
            accountNumber: account.accountNumber,
            accountSum: account.accountSum,
            accountInterest: account.accountInterest
          };
        }
      )
    );
  }

  public getDeposit(depositId: string) {
    return this.httpClient.get<{message: string, deposit: any}>('/application/termDeposits/' + depositId).pipe(
      map(
        (deposit: any) => {
          return {
            id: deposit._id,
            depositNumber: deposit.depositNumber,
            depositSum: deposit.depositSum,
            depositInterest: deposit.depositInterest
          };
        }
      )
    );;
  }

  public removeAccount(accountId: string) {
    return this.httpClient.delete<{message: string}>('/application/currentAccounts/' + accountId);
  }

  public removeDeposit(depositId: string) {
    return this.httpClient.delete<{message: string}>('/application/termDeposits/' + depositId);
  }

  public addRandomAccount(account: Account): Observable<any> {
    return this.httpClient.post<{message: string, accountId: string}>('/application/currentAccounts', account);
  }

  public addRandomDeposit(deposit: Deposit): Observable<any> {
    return this.httpClient.post<{message: string, depositId: string}>('/application/termDeposits', deposit);
  }
}

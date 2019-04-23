import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  public getAccounts(): Observable<{message: string, savingAccounts: Account[]}> {
    return this.httpClient.get<{message: string, savingAccounts: any[]}>('/application/currentAccounts').pipe(
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

  public getDeposits(): Observable<{message: string, currentDeposits: Deposit[]}> {
    return this.httpClient.get<{message: string, currentDeposits: any[]}>('/application/termDeposits').pipe(
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

  public getAccount(accountId: string): Observable<Account> {
    return this.httpClient.get<{account: any}>('/application/currentAccounts/' + accountId).pipe(
      map(
        (serverAccount: any) => {
          const account = serverAccount.account;
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

  public getDeposit(depositId: string): Observable<Deposit> {
    return this.httpClient.get<{deposit: any}>('/application/termDeposits/' + depositId).pipe(
      map(
        (serverDeposit: any) => {
          const deposit = serverDeposit.deposit;
          return {
            id: deposit._id,
            depositNumber: deposit.depositNumber,
            depositSum: deposit.depositSum,
            depositInterest: deposit.depositInterest
          };
        }
      )
    );
  }

  public removeAccount(accountId: string): Observable<{message: string}> {
    return this.httpClient.delete<{message: string}>('/application/currentAccounts/' + accountId);
  }

  public removeDeposit(depositId: string): Observable<{message: string}> {
    return this.httpClient.delete<{message: string}>('/application/termDeposits/' + depositId);
  }

  public addRandomAccount(account: Account): Observable<{message: string, accountId: string}> {
    return this.httpClient.post<{message: string, accountId: string}>('/application/currentAccounts', account);
  }

  public addRandomDeposit(deposit: Deposit): Observable<{message: string, depositId: string}> {
    return this.httpClient.post<{message: string, depositId: string}>('/application/termDeposits', deposit);
  }
}

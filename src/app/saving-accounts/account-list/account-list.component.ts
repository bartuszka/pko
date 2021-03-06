import { Component, OnInit, OnDestroy } from '@angular/core';
import { SavingAccountsService } from '../saving-accounts.service';
import { Account } from '../account.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PromptComponent } from 'src/app/shared/components/prompt.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
  public savingAccounts: Account[] = [];
  private accountsSubscription: Subscription;

  constructor(private savingAccountsService: SavingAccountsService, public dialog: MatDialog) { }

  removeAccount(accountId: string): void {
    this.openDialog(accountId);
  }

  openDialog(accountId: string): void {
    const dialogRef = this.dialog.open(PromptComponent, {
      autoFocus: false,
      data: {
        title: 'Usuwanie rachunku',
        message: 'Czy na pewno chcesz usunąć ten rachunek?',
        confirmBtnText: 'Tak',
        cancelBtnText: 'Nie'
      }
    });

    dialogRef.afterClosed().subscribe(
      (deleteAccount: boolean) => {
        if (deleteAccount) {
          this.savingAccountsService.removeAccount(accountId);
        }
      }
    );
  }

  addAccount(): void {
    this.savingAccountsService.addRandomAccount();
  }

  getLoadingContent(): boolean {
    return this.savingAccountsService.getLoadingContent();
  }

  ngOnInit(): void {
    this.accountsSubscription = this.savingAccountsService.$savingAccounts.subscribe(
      (accounts: Account[]) => {
        this.savingAccounts = accounts;
      }
    );
    this.savingAccountsService.fetchAccounts();
  }

  ngOnDestroy(): void {
    this.accountsSubscription.unsubscribe();
  }
}

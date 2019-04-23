import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromptComponent } from 'src/app/shared/components/prompt.component';
import { BankDepositsService } from '../bank-deposits.service';
import { Subscription } from 'rxjs';
import { Deposit } from '../bank-deposit.model';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.scss']
})
export class DepositListComponent implements OnInit, OnDestroy {

  public savingDeposits: Deposit[] = [];
  private depositsSubscription: Subscription;
  public loadingContent: boolean;

  constructor(private bankDepositsService: BankDepositsService, public dialog: MatDialog) { }

  removeDeposit(depositId: string): void {
    this.openDialog(depositId);
  }

  openDialog(depositId: string): void {
    const dialogRef = this.dialog.open(PromptComponent, {
      autoFocus: false,
      data: {
        title: 'Usuwanie lokaty',
        message: 'Czy na pewno chcesz usunąć tę lokatę?',
        confirmBtnText: 'Tak',
        cancelBtnText: 'Nie'
      }
    });

    dialogRef.afterClosed().subscribe(
      (deleteDeposit: boolean) => {
        if (deleteDeposit) {
          this.loadingContent = true;
          this.bankDepositsService.removeDeposit(depositId);
        }
      }
    );
  }

  addDeposit() {
    this.loadingContent = true;
    this.bankDepositsService.addRandomDeposit();
  }

  getLoadingContent() {
    return this.bankDepositsService.getLoadingContent();
  }

  ngOnInit() {
    this.loadingContent = true;
    this.depositsSubscription = this.bankDepositsService.$savingDeipsits.subscribe(
      (deposits: Deposit[]) => {
        this.savingDeposits = deposits;
        this.loadingContent = false;
      }
    );
    this.bankDepositsService.fetchDeposits();
  }

  ngOnDestroy(): void {
    this.depositsSubscription.unsubscribe();
  }
}

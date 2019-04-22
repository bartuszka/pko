import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositListComponent } from './deposit-list/deposit-list.component';
import { DepositDetailComponent } from './deposit-detail/deposit-detail.component';
import { BankDepositsRoutingModule } from './bank-deposits-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { BankDepositsComponent } from './bank-deposits.component';
import { BankDepositsService } from './bank-deposits.service';


@NgModule({
  declarations: [
    BankDepositsComponent,
    DepositListComponent,
    DepositDetailComponent],
  imports: [
    CommonModule,
    BankDepositsRoutingModule,
    MatExpansionModule,
    SharedModule
  ],
  providers: [
    BankDepositsService
  ]
})
export class BankDepositsModule { }

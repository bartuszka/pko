import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDepositsComponent } from './bank-deposits.component';
import { DepositDetailComponent } from './deposit-detail/deposit-detail.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';

const bankDepositsRoutes: Routes = [
  { path: '', component: BankDepositsComponent, children: [
    { path: '', redirectTo: 'list' },
    { path: 'list', component: DepositListComponent },
    { path: ':id', component: DepositDetailComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(bankDepositsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BankDepositsRoutingModule {

}

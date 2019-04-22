import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SavingAccountsComponent } from './saving-accounts.component';
import { AccountListComponent } from './account-list/account-list.component';

const savingAccountRoutes: Routes = [
  { path: '', component: SavingAccountsComponent, children: [
    { path: 'list', component: AccountListComponent },
    { path: ':id', component: AccountDetailComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(savingAccountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SavingAccountsRoutingModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { SavingAccountsRoutingModule } from './saving-accounts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { SavingAccountsService } from './saving-accounts.service';
import { MatChipsModule } from '@angular/material/chips';
import { SavingAccountsComponent } from './saving-accounts.component';
import { AccountListComponent } from './account-list/account-list.component';


@NgModule({
  declarations: [
    SavingAccountsComponent,
    AccountDetailComponent,
    AccountListComponent
  ],
  imports: [
    CommonModule,
    SavingAccountsRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatChipsModule,
  ],
  providers: [
    SavingAccountsService
  ]
})
export class SavingAccountsModule { }

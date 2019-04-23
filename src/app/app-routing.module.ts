import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { AppInitResolver } from './shared/services/app-init-resolver.service';
import { PageNotExistComponent } from './page-not-exist/page-not-exist.component';


const appRoutes: Routes = [
  { path: '', component: MainPageComponent, resolve: { appInit: AppInitResolver } },
  { path: 'saving-accounts',
    loadChildren: './saving-accounts/saving-accounts.module#SavingAccountsModule',
    resolve: { appInit: AppInitResolver }
  },
  { path: 'bank-deposits',
    loadChildren: './bank-deposits/bank-deposits.module#BankDepositsModule',
    resolve: { appInit: AppInitResolver }
  },
  { path: 'not-found', component: PageNotExistComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { AppInitResolver } from './shared/services/app-init-resolver.service';


const appRoutes: Routes = [
  { path: '', component: MainPageComponent, resolve: { appInit: AppInitResolver } },
  { path: 'saving-accounts',
    loadChildren: './saving-accounts/saving-accounts.module#SavingAccountsModule',
    resolve: { appInit: AppInitResolver } },
  { path: 'bank-deposits',
    loadChildren: './bank-deposits/bank-deposits.module#BankDepositsModule',
    resolve: { appInit: AppInitResolver } }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotExistComponent } from './page-not-exist.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PageNotExistComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PageNotExistModule { }

import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ServerTasksService } from '../shared/services/server-tasks.service';
import { AppInitResolver } from '../shared/services/app-init-resolver.service';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerInterceptor } from '../shared/services/server.interceptor';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    AppRoutingModule,
    MatToolbarModule
  ],
  providers: [
    ServerTasksService,
    AppInitResolver,
    { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true }
  ]
})
export class CoreModule { }

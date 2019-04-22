import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppInitResolver } from './shared/services/app-init-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AppInitResolver
  ]
})
export class AppModule { }

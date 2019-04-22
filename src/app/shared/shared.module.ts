import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PromptComponent } from './components/prompt.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    PromptComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    PromptComponent,
  ],
  entryComponents: [
    PromptComponent
  ]
})
export class SharedModule {

}

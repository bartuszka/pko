import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prompt',
  templateUrl: 'prompt.component.html'
})
export class PromptComponent {
  constructor(
    public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, confirmBtnText: string, cancelBtnText: string }) {}
}

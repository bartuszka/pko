import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PromptComponent } from './shared/components/prompt.component';
import { ErrorHandlingService } from './shared/services/error-handling.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private errorSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private errorHandlingService: ErrorHandlingService
  ) {}

  openDialog(dialogMessage: string): void {
    this.dialog.open(PromptComponent, {
      autoFocus: false,
      data: {
        title: 'Błąd',
        message: dialogMessage,
        cancelBtnText: 'Zamknij'
      }
    });
  }

  ngOnInit(): void {
    this.errorSubscription = this.errorHandlingService.$error.subscribe(
      (error: Error) => {
        if (error) {
          this.openDialog(error.message);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}

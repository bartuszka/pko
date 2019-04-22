import { of, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export class ServerTasksService {
  private appInitialized: boolean = false;

  public getApplicationInit(): boolean | Observable<boolean> {
    if (this.appInitialized) {
      return true;
    } else {
      return of(true).pipe(
        delay(2000),
        tap(
          (appInitialized) => {
            this.appInitialized = appInitialized;
          }
        )
      );
    }
  }

  public getAppInitialized(): boolean {
    return this.appInitialized;
  }
}

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServerTasksService } from './server-tasks.service';

@Injectable()
export class AppInitResolver implements Resolve<boolean> {
  constructor(private serverTasksService: ServerTasksService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.serverTasksService.getApplicationInit();
  }
}

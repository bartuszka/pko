import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ServerInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const serverConnectionString: string = 'http://localhost:3000';
    if (req.url.indexOf('http://') !== -1) {
      return next.handle(req);
    }
    const copiedReq = req.clone({url: serverConnectionString + req.url});
    return next.handle(copiedReq);
  }
}

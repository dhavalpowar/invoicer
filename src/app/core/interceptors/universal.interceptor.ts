import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

/**
 * This interceptor ensures that outgoing AJAX request have the URL context
 * for making API calls on the SSR app.
 */
@Injectable()
export class UniversalInterceptor implements HttpInterceptor {

  constructor(@Optional() @Inject(APP_BASE_HREF) protected serverUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const serverReq = !this.serverUrl ? req : req.clone({
      url: `${this.serverUrl}${req.url}`
    });

    return next.handle(serverReq);
  }

}

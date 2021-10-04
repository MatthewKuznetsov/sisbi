import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { ResponseMessageResolverService } from './response-message-resolver.service';

@Injectable()
export class NotificationsInterceptor implements HttpInterceptor {

  constructor(
    private _notificationsService: NotificationsService,
    private _messageResolverService: ResponseMessageResolverService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              const message = this._messageResolverService.resolve(event.status, event.url);
              this._notificationsService.notify(message.message, message.status);
            }
          },
          error => {
            if (error instanceof HttpErrorResponse) {
              const message = this._messageResolverService.resolve(error.status, error.url);
              this._notificationsService.notify(message.message, message.status);
            }
          }
        ),
      );
  }

}
import { Injectable } from '@angular/core';
import { TuiNotification, TuiNotificationOptions, TuiNotificationsService } from '@taiga-ui/core';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    
    private readonly _options: TuiNotificationOptions = {
        status: TuiNotification.Info,
        autoClose: 5000
    }

    constructor(private _tuiNotificationsService: TuiNotificationsService) { }
    
    notify(message: string, status: TuiNotification): void {
        this._tuiNotificationsService.show(message, {
            ...this._options,
            status
        }).subscribe();
    }

    info(message: string): void {
        this._tuiNotificationsService.show(message, { ...this._options }).subscribe();
    }
    
    success(message: string): void {
        this._tuiNotificationsService.show(message, {
            ...this._options,
            status: TuiNotification.Success
        }).subscribe();
    }

    error(message: string): void {
        this._tuiNotificationsService.show(message, {
            ...this._options,
            status: TuiNotification.Error
        }).subscribe();
    }

    warn(message: string): void {
        this._tuiNotificationsService.show(message, {
            ...this._options,
            status: TuiNotification.Warning
        }).subscribe();
    }

}

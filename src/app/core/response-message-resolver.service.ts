import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TuiNotification } from '@taiga-ui/core';

export interface IMessageDef {
    status: TuiNotification;
    message: string;
    context?: any;
}

export interface IFakeHttpResponse {
    ok: boolean;
    status: number;
    url?: string;
}

@Injectable({ providedIn: 'root' })
export class ResponseMessageResolverService {

    resolve(ok: boolean, status?: number, url?: string): IMessageDef {
        if (ok) {
            return {
                status: TuiNotification.Success,
                message: 'Всё прошло успешно! 😉',
            };
        }
        return {
            status: TuiNotification.Error,
            message: 'Извините, произошла ошибка. 😟',
        };
    }

}

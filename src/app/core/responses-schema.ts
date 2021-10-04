import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  CONNECT = 'CONNECT',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}

export interface IResponseSchemaItem {
  message: string;
  url?: string | RegExp;
  status?: number | number[] | string | RegExp;
  method?: HTTPMethod;
  showStatus?: 'info' | 'error' | 'warn' | 'success';
  visible?: boolean;
  handle?(response?: HttpErrorResponse | HttpResponse<any>): void;
}

export const schema: IResponseSchemaItem[] = [
  {
    url: '/account/otp/send',
    status: /2\d{2}/,
    message: 'Успешно отослал'
  }
];

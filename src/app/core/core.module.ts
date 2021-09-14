import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { of } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationsInterceptor } from './notifications.interceptor';
import { RouterModule } from '@angular/router';

export const API_URL = new InjectionToken<string>('API_URL');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationsInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule { }

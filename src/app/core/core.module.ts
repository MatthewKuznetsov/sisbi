import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const API_URL = new InjectionToken<string>('API_URL');

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        { provide: API_URL, useValue: environment.API_URL },
    ],
})
export class CoreModule { }

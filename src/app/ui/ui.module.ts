import { NgModule } from '@angular/core';

import { TuiAccordionModule, TuiFieldErrorModule, TuiInputNumberModule, TuiInputModule, TuiInputPasswordModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiCalendarModule, TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
    imports: [
        TuiAccordionModule,
        TuiButtonModule,
        TuiCalendarModule,
        TuiInputModule,
        TuiInputPhoneModule,
        TuiInputNumberModule,
        TuiInputPasswordModule,
        TuiSvgModule,
        TuiFieldErrorModule,
        
        TextMaskModule,
    ],
    exports: [
        TuiAccordionModule,
        TuiButtonModule,
        TuiCalendarModule,
        TuiInputModule,
        TuiInputPhoneModule,
        TuiInputNumberModule,
        TuiInputPasswordModule,
        TuiSvgModule,
        TuiFieldErrorModule,
        
        TextMaskModule,
    ],
    declarations: [],
    providers: [],
})
export class UIModule { }

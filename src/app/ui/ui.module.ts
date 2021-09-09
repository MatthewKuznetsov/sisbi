import { NgModule } from '@angular/core';

import { TuiAccordionModule, TuiFieldErrorModule, TuiInputNumberModule, TuiInputModule, TuiInputPasswordModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiCalendarModule, TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
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
        TuiAutoFocusModule,
        
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
        TuiAutoFocusModule,
        
        TextMaskModule,
    ],
    declarations: [],
    providers: [],
})
export class UIModule { }

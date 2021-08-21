import { NgModule } from '@angular/core';

import { TuiAccordionModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiCalendarModule } from '@taiga-ui/core';

@NgModule({
    imports: [
        TuiAccordionModule,
        TuiButtonModule,
        TuiCalendarModule,
    ],
    exports: [
        TuiAccordionModule,
        TuiButtonModule,
        TuiCalendarModule,
    ],
    declarations: [],
    providers: [],
})
export class UIModule { }

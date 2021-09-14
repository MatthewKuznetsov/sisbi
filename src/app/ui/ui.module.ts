import { NgModule } from '@angular/core';

import { TuiAccordionModule, TuiFieldErrorModule, TuiInputNumberModule, TuiInputModule, TuiInputPasswordModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { TuiCalendarModule, TuiButtonModule, TuiSvgModule, TuiLinkModule } from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TextMaskModule } from 'angular2-text-mask';
import { SocialSignUpButtonsComponent } from './social-sign-up-buttons/social-sign-up-buttons.component';

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
    TuiLinkModule,

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
    TuiLinkModule,

    TextMaskModule,

    SocialSignUpButtonsComponent,
  ],
  declarations: [
    SocialSignUpButtonsComponent,
  ],
  providers: [],
})
export class UIModule { }

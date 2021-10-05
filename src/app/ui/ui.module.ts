import { NgModule } from '@angular/core';

import { TuiAccordionModule, TuiFieldErrorModule, TuiInputNumberModule, TuiInputModule, TuiInputPasswordModule, TuiInputPhoneModule, TuiAvatarModule } from '@taiga-ui/kit';
import { TuiCalendarModule, TuiButtonModule, TuiSvgModule, TuiLinkModule, TuiDataListModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TextMaskModule } from 'angular2-text-mask';
import { SocialSignUpButtonsComponent } from './social-sign-up-buttons/social-sign-up-buttons.component';
import { AvatarComponent } from './avatar/avatar.component';

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
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiAvatarModule,

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
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiAvatarModule,

    TextMaskModule,

    SocialSignUpButtonsComponent,
    AvatarComponent,
  ],
  declarations: [
    SocialSignUpButtonsComponent,
    AvatarComponent,
  ],
  providers: [],
})
export class UIModule { }

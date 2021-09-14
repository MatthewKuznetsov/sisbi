import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UIModule } from 'src/app/ui/ui.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';


@NgModule({
  imports: [
    CoreModule,
    UIModule,
    SignInRoutingModule,
  ],
  declarations: [
    SignInComponent,
  ],
})
export class SignInModule { }

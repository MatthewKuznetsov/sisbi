import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UIModule } from 'src/app/ui/ui.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';


@NgModule({
  imports: [
    CoreModule,
    UIModule,
    SignInRoutingModule,
  ],
  declarations: [
    SignInComponent,
    RestorePasswordComponent,
  ],
})
export class SignInModule { }

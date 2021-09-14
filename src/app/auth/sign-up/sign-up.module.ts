import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UIModule } from 'src/app/ui/ui.module';
import { ApplicantComponent } from './applicant/applicant.component';
import { EmployerComponent } from './employer/employer.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    CoreModule,
    UIModule,
    SignUpRoutingModule,
  ],
  declarations: [
    SignUpComponent,
    ApplicantComponent,
    EmployerComponent,
  ],
})
export class SignUpModule { }

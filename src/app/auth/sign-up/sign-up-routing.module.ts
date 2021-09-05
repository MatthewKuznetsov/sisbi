import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicantComponent } from "./applicant/applicant.component";
import { EmployerComponent } from "./employer/employer.component";
import { SignUpComponent } from "./sign-up.component";

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'applicant',
    component: ApplicantComponent,
  },
  {
    path: 'employer',
    component: EmployerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }

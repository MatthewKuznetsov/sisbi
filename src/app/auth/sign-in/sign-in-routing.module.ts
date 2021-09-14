import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestorePasswordComponent } from "./restore-password/restore-password.component";
import { SignInComponent } from "./sign-in.component";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'restore-password',
    component: RestorePasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }

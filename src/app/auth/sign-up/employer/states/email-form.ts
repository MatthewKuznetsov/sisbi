import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { emailValidator } from "src/app/core/helpers";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";
import { IEmployerData } from "../employer.component";
import { EmailVerificationForm } from "./email-verification-form";

export class EmailForm extends FormState<IEmployerData> {

  type = StateTypes.EMAIL;
  form = new FormControl('', [Validators.required, emailValidator()])

  constructor(
    public target: IStatefullForm<IEmployerData>,
    private _authService: AuthService,
    private _router: Router,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    this._authService
      .verifyEmail$(this.form.value)
      .subscribe({
        next: () => {
          this.target.loading(false);
          this.target.data.email = this.form.value;
          this.target.setState(
            new EmailVerificationForm(
              this.target,
              this._authService,
              this._router,
            )
          );
        },
        error: () => {
          this.target.loading(false);
          this.form.reset();
        }
      });
  }

  prev(): void { }

}
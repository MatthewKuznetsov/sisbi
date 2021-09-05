import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { IApplicantData } from "../applicant.component";
import { EmailVerificationForm } from "./email-verification-form";
import { FormState, StateTypes } from "./form-state";
import { IStatefullForm } from "./statefull";

export class EmailForm extends FormState<IApplicantData> {

  type = StateTypes.EMAIL;
  form = new FormControl('', [Validators.required, this.emailValidator()])

  constructor(
    public target: IStatefullForm<IApplicantData>,
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

  emailValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      return /^\S+@\S+\.\S+$/.test(input.value) ? null : { invalidEmail: "Не соответстовует шаблону xxx@xxx.xxx" };
    };
  };

}
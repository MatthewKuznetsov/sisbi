import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { IApplicantData } from "../applicant.component";
import { FormState, StateTypes } from "./form-state";
import { SmsVerificationForm } from "./sms-verification-form";
import { IStatefullForm } from "./statefull";

export class PhoneForm extends FormState<IApplicantData> {

  type = StateTypes.PHONE;
  form = new FormControl('', [Validators.required, this.phoneValidator()])

  constructor(
    public target: IStatefullForm<IApplicantData>,
    private _authService: AuthService,
    private _router: Router,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    this._authService
      .verifyPhone$(this.form.value)
      .subscribe({
        next: () => {
          this.target.loading(false);
          this.target.data.phone = this.form.value;
          this.target.setState(
            new SmsVerificationForm(
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

  phoneValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      return /^\+7\d{10}$/.test(input.value) ? null : { invalidEmail: "Не соответстовует шаблону +7 (xxx) xxx-xx-xx" };
    };
  };

}
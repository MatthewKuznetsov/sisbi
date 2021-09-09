import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { IApplicantData } from "../applicant.component";
import { EmailForm } from "./email-form";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";
import { passwordValidator } from "src/app/core/helpers";

export class PasswordForm extends FormState<IApplicantData> {

  type = StateTypes.PASSWORD;
  form = new FormGroup({
    password: new FormControl(
      '',
      [
        Validators.required,
        passwordValidator(),
      ]
    ),
    confirmPassword: new FormControl(
      '',
      [
        Validators.required,
        passwordValidator(),
        this.confirmPasswordValidator.bind(this)
      ]
    )
  });

  constructor(
    public target: IStatefullForm<IApplicantData>,
    private _authService: AuthService,
    private _router: Router,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    if (!this.target.data.phone && !this.target.data.email) {
      throw new Error('No phone number or email were received from previous steps');
    }
    this._authService
      .signUpAsApplicant$(
        (this.target.data.phone || this.target.data.email)!,
        this.form?.get('password')?.value
      )
      .subscribe({
        next: () => this._router.navigate(['/']),
        error: () => this.form.reset()
      });
  }

  prev(): void {
    this.target.data = {};
    this.target.setState(
      new EmailForm(
        this.target,
        this._authService,
        this._router,
      )
    );
  }

  confirmPasswordValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      const equals = this.form?.get('password')?.value === input.value;
      return equals ? null : { notTheSamePassword: "Пароль не совпадает с ранее введённым" };
    };
  };

}
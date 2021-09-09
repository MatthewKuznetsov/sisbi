import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { EmailForm } from "./email-form";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";
import { IEmployerData } from "../employer.component";
import { passwordValidator } from "src/app/core/helpers";
import { PersonalForm } from "./personal-form";

export class PasswordForm extends FormState<IEmployerData> {

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
    public target: IStatefullForm<IEmployerData>,
    private _authService: AuthService,
    private _router: Router,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    console.log(this.target.data);
    this.target.loading(true);
    if (!this.target.data.phone && !this.target.data.email) {
      throw new Error('No phone number or email were received from previous steps');
    }
    if (!this.target.data.name) {
      throw new Error('No name were received from previous steps');
    }
    if (!this.target.data.organization) {
      throw new Error('No organization were received from previous steps');
    }
    this._authService
      .signUpAsEmployer$(
        (this.target.data.phone || this.target.data.email)!,
        this.form?.get('password')?.value,
        this.target.data.name,
        this.target.data.organization
      )
      .subscribe({
        next: () => this._router.navigate(['/']),
        error: () => this.form.reset()
      });
  }

  prev(): void {
    this.target.setState(
      new PersonalForm(
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
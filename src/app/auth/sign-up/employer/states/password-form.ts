import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FormState, StateTypes } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { IEmployerData } from "../employer.component";
import { passwordValidator } from "src/app/core/helpers";
import { EmployerStatesFactory } from "../employer-sates-factory";

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
    private factory: EmployerStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
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
    this.factory.authService
      .signUpAsEmployer$(
        (this.target.data.phone || this.target.data.email)!,
        this.form?.get('password')?.value,
        this.target.data.name,
        this.target.data.organization
      )
      .subscribe({
        next: () => this.factory.router.navigate(['/']),
        error: () => this.form.reset()
      });
  }

  prev(): void {
    this.target.setState(this.factory.personalForm);
  }

  confirmPasswordValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      const equals = this.form?.get('password')?.value === input.value;
      return equals ? null : { notTheSamePassword: "Пароль не совпадает с ранее введённым" };
    };
  };

}
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { passwordValidator } from "src/app/core/helpers";
import { EmployerStatesFactory } from "../employer-sates-factory";

export class PasswordForm extends FormState {

  type = 'password';
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
      ]
    )
  }, [this.confirmPasswordValidator()]);

  constructor(
    public target: IStatefullForm,
    private factory: EmployerStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.password = this.form?.get('password')?.value;
    this.target.submit();
  }

  prev(): void {
    this.target.setState(this.factory.personalForm);
  }

  confirmPasswordValidator(): ValidatorFn {
    return (input: AbstractControl): ValidationErrors | null => {
      const first = input?.get('password')?.value;
      const second = input?.get('confirmPassword')?.value;
      const equals = first === second;
      return equals ? null : { notTheSamePassword: "Пароли не совпадают" };
    };
  };

}
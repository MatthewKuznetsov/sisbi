import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { IApplicantData } from "../applicant.component";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { passwordValidator } from "src/app/core/helpers";
import { ApplicantStatesFactory } from "../applicant-states-factory";

export class PasswordForm extends FormState<IApplicantData> {

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
    public target: IStatefullForm<IApplicantData>,
    private factory: ApplicantStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.loading(true);
    if (!this.target.data.phone && !this.target.data.email) {
      throw new Error('No phone number or email were received from previous steps');
    }
    this.factory.authService
      .signUpAsApplicant$(
        (this.target.data.phone || this.target.data.email)!,
        this.form?.get('password')?.value
      )
      .subscribe({
        next: () => this.factory.router.navigate(['/']),
        error: () => this.form.reset()
      });
  }

  prev(): void {
    this.target.data = {};
    this.target.setState(this.factory.emailForm);
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
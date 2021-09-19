import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { TextMaskConfig } from "angular2-text-mask";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { forDigitsValidator } from "src/app/core/helpers";
import { EmployerStatesFactory } from "../employer-sates-factory";

export class EmailVerificationForm extends FormState {


  type = 'email-verification';
  form = new FormControl(
    '',
    [
      Validators.required,
      forDigitsValidator(),
    ],
    [
      this.codeValidator(this.factory.authService, this.target).bind(this)
    ]
  );
  mask: TextMaskConfig = {
    guide: false,
    mask: [ /\d/, /\d/, /\d/, /\d/ ]
  };

  constructor(
    public target: IStatefullForm,
    private factory: EmployerStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.code = this.form.value;
    this.target.setState(this.factory.personalForm);
  }

  prev(): void {
    this.target.data.email = undefined;
    this.target.setState(this.factory.emailForm);
  }

  codeValidator(
    authService: AuthService,
    target: IStatefullForm,
  ): AsyncValidatorFn {
    return (input: AbstractControl): Observable<ValidationErrors | null> => {
      target.loading(true);
      if (!target.data.email) {
        throw new Error('No email were received from previous step');
      }
      return authService.verifyEmailCode$(
        input.value,
        target.data.email
      ).pipe(
        map(res => res ? null : { invalidCode: "Неверный код" }),
        catchError(() => of({ invalidCode: "Неверный код" })),
        tap(() => target.loading(false)),
      );
    };
  };

}
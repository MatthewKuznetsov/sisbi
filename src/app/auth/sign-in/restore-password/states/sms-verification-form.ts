import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { TextMaskConfig } from "angular2-text-mask";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { forDigitsValidator } from "src/app/core/helpers";
import { FormState } from "../../../statefull-form/form-state";
import { IStatefullForm } from "../../../statefull-form/statefull";
import { RestorePasswordStatesFactory } from "../restore-password-states-factory";

export class SmsVerificationForm extends FormState {

  type = 'sms-verification';
  form = new FormControl(
    '',
    [
      Validators.required,
      forDigitsValidator(),
    ],
    [
      this.codeValidator(this.factory.authService, this.target)
    ]
  );

  mask: TextMaskConfig = {
    guide: false,
    mask: [ /\d/, /\d/, /\d/, /\d/ ]
  };

  constructor(
    public target: IStatefullForm,
    private factory: RestorePasswordStatesFactory,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.code = this.form.value;
    this.target.setState(this.factory.passwordForm);
  }

  prev = (): void => {
    this.target.data.phone = undefined;
    this.target.setState(this.factory.phoneForm);
  }

  codeValidator(
    authService: AuthService,
    target: IStatefullForm,
  ): AsyncValidatorFn {
    return (input: AbstractControl): Observable<ValidationErrors | null> => {
      target.loading(true);
      if (!target.data.phone) {
        throw new Error('No phone number were received from previous step');
      }
      return authService.verifySmsCode$(
        input.value,
        target.data.phone
      ).pipe(
        map(res => res ? null : { invalidCode: "Неверный код" }),
        catchError(() => of({ invalidCode: "Неверный код" })),
        tap(() => target.loading(false)),
      );
    };
  };

}
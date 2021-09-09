import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TextMaskConfig } from "angular2-text-mask";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { forDigitsValidator } from "src/app/core/helpers";
import { IApplicantData } from "../../applicant/applicant.component";
import { PasswordForm } from "../../applicant/states/password-form";
import { PhoneForm } from "../../applicant/states/phone-form";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";

export class SmsVerificationForm extends FormState<IApplicantData> {

  type = StateTypes.SMS_VERIFICATION;
  form = new FormControl(
    '',
    [
      Validators.required,
      forDigitsValidator(),
    ],
    [
      this.codeValidator(this._authService, this.target)
    ]
  );

  mask: TextMaskConfig = {
    guide: false,
    mask: [ /\d/, /\d/, /\d/, /\d/ ]
  };

  constructor(
    public target: IStatefullForm<IApplicantData>,
    private _authService: AuthService,
    private _router: Router,
  ) { super(); }

  next(): void {
    if (!this.form.valid) { return; }
    this.target.data.code = this.form.value;
    this.target.setState(
      new PasswordForm(
        this.target,
        this._authService,
        this._router,
      )
    );
  }

  prev(): void {
    this.target.data.phone = undefined;
    this.target.setState(
      new PhoneForm(
        this.target,
        this._authService,
        this._router,
      )
    );
  }

  codeValidator(
    authService: AuthService,
    target: IStatefullForm<IApplicantData>,
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
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { phoneValidator } from "src/app/core/helpers";
import { FormState, StateTypes } from "../../statefull-form/form-state";
import { IStatefullForm } from "../../statefull-form/statefull";
import { IEmployerData } from "../employer.component";
import { SmsVerificationForm } from "./sms-verification-form";

export class PhoneForm extends FormState<IEmployerData> {

  type = StateTypes.PHONE;
  form = new FormControl('', [Validators.required, phoneValidator()])

  constructor(
    public target: IStatefullForm<IEmployerData>,
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

}
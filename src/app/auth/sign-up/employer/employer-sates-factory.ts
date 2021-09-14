import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { IStatefullForm } from "../../statefull-form/statefull";
import { IEmployerData } from "./employer.component";
import { EmailForm } from "./states/email-form";
import { EmailVerificationForm } from "./states/email-verification-form";
import { PasswordForm } from "./states/password-form";
import { PersonalForm } from "./states/personal-form";
import { PhoneForm } from "./states/phone-form";
import { SmsVerificationForm } from "./states/sms-verification-form";

export class EmployerStatesFactory {

  private _cache: { [key: string]: any; } = {};

  constructor(
    private target: IStatefullForm<IEmployerData>,
    public authService: AuthService,
    public router: Router,
  ) { }

  get emailForm(): EmailForm {
    if (this._cache.emailForm) {
      this._cache.emailForm.form.reset();
      return this._cache.emailForm
    }
    return this._cache.emailForm = new EmailForm(this.target, this);
  }

  get emailVerificationForm(): EmailVerificationForm {
    if (this._cache.emailVerificationForm) {
      this._cache.emailVerificationForm.form.reset();
      return this._cache.emailVerificationForm
    }
    return this._cache.emailVerificationForm = new EmailVerificationForm(this.target, this);
  }

  get passwordForm(): PasswordForm {
    if (this._cache.passwordForm) {
      this._cache.passwordForm.form.reset();
      return this._cache.passwordForm
    }
    return this._cache.passwordForm = new PasswordForm(this.target, this);
  }

  get phoneForm(): PhoneForm {
    if (this._cache.phoneForm) {
      this._cache.phoneForm.form.reset();
      return this._cache.phoneForm
    }
    return this._cache.phoneForm = new PhoneForm(this.target, this);
  }

  get smsVerificationForm(): SmsVerificationForm {
    if (this._cache.smsVerificationForm) {
      this._cache.smsVerificationForm.form.reset();
      return this._cache.smsVerificationForm
    }
    return this._cache.smsVerificationForm = new SmsVerificationForm(this.target, this);
  }

  get personalForm(): PersonalForm {
    if (this._cache.personalForm) {
      this._cache.personalForm.form.reset();
      return this._cache.personalForm
    }
    return this._cache.personalForm = new PersonalForm(this.target, this);
  }

}

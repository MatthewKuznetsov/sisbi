import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { AuthService } from '../../auth.service';
import { FormState } from '../../statefull-form/form-state';
import { IStatefullForm } from '../../statefull-form/statefull';
import { RestorePasswordStatesFactory } from './restore-password-states-factory';

@Component({
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: { required: 'Это обязательное поле' },
    },
  ],
})
export class RestorePasswordComponent extends IStatefullForm {

  private _statesFactory: RestorePasswordStatesFactory;
  state!: FormState;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    super();
    this._statesFactory = new RestorePasswordStatesFactory(this, _authService, _router);
    this.useEmail();
  }

  submit(): void {
    this.loading(true);
    if (!this.data.phone && !this.data.email) {
      throw new Error('No phone number or email were received from previous steps');
    }
    if (!this.data.password) {
      throw new Error('No password was received from previous steps');
    }
    this._authService
      .setPassword$(
        (this.data.phone || this.data.email)!,
        this.data.password
      )
      .subscribe({
        next: () => this._router.navigate(['/sign-in']),
        error: () => this.useEmail()
      });
  }

  useEmail(): void {
    this.setState(this._statesFactory.emailForm);
  }

  usePhone(): void {
    this.setState(this._statesFactory.phoneForm);
  }

  getUsername(): string | undefined {
    if (!(this.data.user.Email || this.data.user.Phone)) {
      throw new Error('No username was provided');
    }
    return this.data.user.Email || this.data.user.Phone;
  }

}

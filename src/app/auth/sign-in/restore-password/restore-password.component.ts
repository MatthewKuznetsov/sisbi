import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';
import { FormState } from '../../statefull-form/form-state';
import { IStatefullForm } from '../../statefull-form/statefull';
import { RestorePasswordStatesFactory } from './restore-password-states-factory';

export interface IRestorePasswordData {
  phone?: string;
  email?: string;
  code?: string;
  password?: string;
}

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
export class RestorePasswordComponent implements IStatefullForm<IRestorePasswordData> {

  private _loading$$ = new BehaviorSubject<boolean>(false);
  private _statesFactory: RestorePasswordStatesFactory;

  loading$ = this._loading$$.asObservable();
  state!: FormState<IRestorePasswordData>;
  data: IRestorePasswordData = {};

  constructor(
    authService: AuthService,
    router: Router,
  ) {
    this._statesFactory = new RestorePasswordStatesFactory(this, authService, router);
    this.useEmail();
  }

  setState(state: FormState<IRestorePasswordData>) {
    this.state = state;
  }

  useEmail(): void {
    this.setState(this._statesFactory.emailForm);
  }

  usePhone(): void {
    this.setState(this._statesFactory.phoneForm);
  }

  loading(status: boolean): void {
    this._loading$$.next(status);
  }

  next() {
    this.state.next();
  }

  prev(): void {
    this.state.prev();
  }

  hasPrev(): boolean {
    return this.state.type !== 'phone' && this.state.type !== 'email';
  }

  getUsername(): string | undefined {
    return this.data.email || this.data.phone;
  }

}

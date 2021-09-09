import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';
import { FormState, StateTypes } from '../statefull-form/form-state';
import { IStatefullForm } from '../statefull-form/statefull';
import { EmailForm } from './states/email-form';
import { PhoneForm } from './states/phone-form';

export interface IEmployerData {
  phone?: string;
  email?: string;
  name?: string;
  organization?: string;
  code?: string;
  password?: string;
}

@Component({
  selector: 'sis-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: { required: 'Это обязательное поле' },
    },
  ],
})
export class EmployerComponent implements IStatefullForm<IEmployerData> {

  private _loading$$ = new BehaviorSubject<boolean>(false);
  private _emailForm: EmailForm;
  private _phoneForm: PhoneForm;

  loading$ = this._loading$$.asObservable();
  state!: FormState<IEmployerData>;
  data: IEmployerData = {};

  constructor(
    authService: AuthService,
    router: Router,
  ) {
    this._emailForm = new EmailForm(
      this,
      authService,
      router,
    );
    this._phoneForm = new PhoneForm(
      this,
      authService,
      router,
    );
    this.useEmail();
  }

  loading(status: boolean): void {
    this._loading$$.next(status);
  }

  setState(state: FormState<IEmployerData>) {
    this.state = state;
  }

  useEmail(): void {
    this.setState(this._emailForm);
  }

  usePhone(): void {
    this.setState(this._phoneForm);
  }

  next() {
    this.state.next();
  }

  prev(): void {
    this.state.prev();
  }

  hasPrev(): boolean {
    return this.state.type !== StateTypes.PHONE && this.state.type !== StateTypes.EMAIL;
  }

  getUsername(): string | undefined {
    return this.data.email || this.data.phone;
  }

}

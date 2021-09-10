import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';
import { EmailForm } from './states/email-form';
import { FormState, StateTypes } from '../../statefull-form/form-state';
import { PhoneForm } from './states/phone-form';
import { IStatefullForm } from '../../statefull-form/statefull';
import { ApplicantStatesFactory } from './applicant-states-factory';

export interface IApplicantData {
  phone?: string;
  email?: string;
  code?: string;
  password?: string;
}

@Component({
  selector: 'sis-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: { required: 'Это обязательное поле' },
    },
  ],
})
export class ApplicantComponent implements IStatefullForm<IApplicantData> {

  private _loading$$ = new BehaviorSubject<boolean>(false);
  private _statesFactory: ApplicantStatesFactory;

  loading$ = this._loading$$.asObservable();
  state!: FormState<IApplicantData>;
  data: IApplicantData = {};

  constructor(
    authService: AuthService,
    router: Router,
  ) {
    this._statesFactory = new ApplicantStatesFactory(this, authService, router);
    this.useEmail();
  }

  setState(state: FormState<IApplicantData>) {
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
    return this.state.type !== StateTypes.PHONE && this.state.type !== StateTypes.EMAIL;
  }

  getUsername(): string | undefined {
    return this.data.email || this.data.phone;
  }

}

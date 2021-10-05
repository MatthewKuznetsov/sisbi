import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, throwError, timer } from 'rxjs';
import { delay, map, mapTo, tap } from 'rxjs/operators';
import { Token } from '../models/token/token.model';
import { Gender, OtpType, Role, User } from '../models/user/user.model';

export interface ITokens {
  access: Token;
  refresh: Token;
}

@Injectable({ providedIn: 'root' })
export class AuthFakeService {

  private readonly __log = 'fuji@mount.jp';
  private readonly __pass = 'password';
  private readonly __usr: User = new User({
    Id: 'fuji@mount.jp',
    FirstName: 'mount',
    SecondName: 'fuji',
    Company: 'Name & Co',
    Gender: Gender.Male,
    BDate: '',
    Address: 'Fuji Mountain',
    Otp: 1,
    OtpDate: new Date().getTime(),
    OtpRetry: 1,
    OtpType: OtpType.SignUp,
    Phone: '+09998887766',
    PhoneConfirmed: false,
    Email: 'fuji@mount.jp',
    EmailConfirmed: true,
    Password: 'password',
    Salt: '',
    Role: Role.Employer,
    Avatar: '',
    // Avatar: 'https://taiga-ui.dev/assets/images/taiga.svg',
    RegistrationDate: new Date().getTime(),
  });

  private _user$$ = new ReplaySubject<User>(1);
  private _accessToken$$ = new ReplaySubject<Token>(1);

  user$: Observable<User> = this._user$$.asObservable();
  accessToken$: Observable<Token> = this._accessToken$$.asObservable();

  constructor() {
    console.warn('App uses FAKE auth service.');
    this._user$$.next(this.__usr)
  }

  auth$(login: string, password: string): Observable<User | undefined> {
    if (login !== this.__log) { return throwError('Incorrect login or password'); }
    if (password !== this.__pass) { return throwError('Incorrect login or password'); }
    return of(this.__usr).pipe(
      delay(200),
      tap(e => this._user$$.next(e))
    );
  }

  signUpAsApplicant$(login: string, password: string): Observable<User | undefined> {
    return this.auth$(login, password).pipe(
      map(e => e && new User({ ...e, Role: Role.Worker }) ),
      tap(e => this._user$$.next(e))
    );
  }

  setPassword$(login: string, password: string): Observable<User | undefined> {
    return timer(200).pipe(
      mapTo<number, User>(this.__usr)
    );
  }

  signUpAsEmployer$(login: string, password: string, name: string, organization: string): Observable<User | undefined> {
    return this.auth$(login, password).pipe(
      map(e => e && new User({ ...e, Role: Role.Employer }) ),
      tap(e => this._user$$.next(e))
    );
  }

  verifyPhone$(phone: string): Observable<User> {
    return timer(200).pipe(mapTo(new User({ ...this.__usr, Phone: '+77777777777' })));
  }

  verifyEmail$(email: string): Observable<User> {
    return timer(200).pipe(mapTo(new User({ ...this.__usr, Email: 'foo@boo.ru' })));
  }

  verifySmsCode$(code: string, phone: string): Observable<boolean> {
    return timer(200).pipe(
      map(() => Math.random() >= 0.5)
    );
  }

  verifyEmailCode$(code: string, email: string): Observable<boolean> {
    return timer(200).pipe(
      map(() => Math.random() >= 0.5)
    );
  }

  logOut(): void {
    this._user$$.next(undefined);
  }

}
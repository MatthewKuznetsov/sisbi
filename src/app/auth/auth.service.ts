import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { API_URL } from '../core/core.module';
import { LocalStorageService } from '../core/localstorage.service';
import { IToken, Token } from '../models/token/token.model';
import { IUser, OtpType, Role, User } from '../models/user/user.model';

export interface ITokens {
  access: Token;
  refresh: Token;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly LS_REFRESH_KEY = 'refresh-token';

  private _user$$ = new ReplaySubject<User | undefined>(1);
  private _accessToken$$ = new ReplaySubject<Token>(1);

  user$: Observable<User | undefined> = this._user$$.asObservable();
  accessToken$: Observable<Token> = this._accessToken$$.asObservable();

  constructor(
    @Inject(API_URL)
    private _apiUrl: string,
    private _http: HttpClient,
    private _LSServece: LocalStorageService,
  ) {
    this.refreshTokens();
  }

  auth$(login: string, password: string): Observable<User | undefined> {
    return this._http
      .post<{ refresh: IToken; user: IUser; }>(
        `${this._apiUrl}/auth`,
        { login, password },
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        map(e => ({ ...e, user: e.body?.user && new User(e.body?.user) }) as any),
        map(e => {
          if (!e.body) { throw new Error('No response payload'); }
          const refresh = new Token(e.body.refresh.Token, e.body.refresh.Id);
          const accessTokenString = e.headers
            .get('Authorization')
            ?.replace('Bearer ', '');
          const access = new Token(accessTokenString || '');
          this._updateTokens({ refresh, access })
          return e.body?.user;
        }),
        catchError(error => {
          console.error(error);
          return of(undefined);
        })
      );
  }

  verifyPhone$(phone: string): Observable<void> {
    return this._http.post<void>(
      `${this._apiUrl}/account/otp/send`,
      { login: phone, type: OtpType.SignUp }
    );
  }

  verifyEmail$(email: string): Observable<void> {
    return this._http.post<void>(
      `${this._apiUrl}/account/otp/send`,
      { login: email, type: OtpType.SignUp }
    );
  }
  
  verifySmsCode$(code: string, phone: string): Observable<boolean> {
    return this._http.post<void>(
      `${this._apiUrl}/account/otp/confirm`,
      { login: phone, code }
    ).pipe(
      mapTo(true),
      catchError(() => of(false))
    );
  }
  
  verifyEmailCode$(code: string, email: string): Observable<boolean> {
    return this._http.post<void>(
      `${this._apiUrl}/account/otp/confirm`,
      { login: email, code }
    ).pipe(
      mapTo(true),
      catchError(() => of(false))
    );
  }

  signUpAsApplicant$(login: string, password: string): Observable<User> {
    return this._http.post<IUser>(
      `${this._apiUrl}/account/signup`,
      { login, password, role: Role.Worker }
    ).pipe(
      map(e => new User(e)),
      tap(
        e => {
          this._user$$.next(e);
        },
        () => this._user$$.next(undefined)
      )
    );
  }

  signUpAsEmployer$(login: string, password: string, name: string, organization: string): Observable<User> {
    return this._http.post<IUser>(
      `${this._apiUrl}/account/signup`,
      { login, password, name, organization, role: Role.Employer }
    ).pipe(
      map(e => new User(e)),
      tap(
        e => {
          this._user$$.next(e);
        },
        () => this._user$$.next(undefined)
      )
    );
  }

  setPassword$(login: string, password: string): Observable<User | undefined> {
    return timer(200)
      .pipe( mapTo(new User({} as IUser)));
  }

  refreshTokens(): void {
    timer(200)
      .subscribe(() => this._user$$.next(new User({} as IUser)));
  }

  private _updateTokens(tokens: ITokens): void {
    this._LSServece.setItem(this.LS_REFRESH_KEY, tokens.refresh);
    this._accessToken$$.next(tokens.access);
  }
  
  logOut(): void {
    this._LSServece.removeItem(this.LS_REFRESH_KEY);
    this._user$$.next(undefined);
  }

}
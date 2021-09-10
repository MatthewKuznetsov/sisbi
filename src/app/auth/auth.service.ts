import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { API_URL } from '../core/core.module';
import { LocalStorageService } from '../core/localstorage.service';
import { IRefreshToken } from '../models/refresh-token/refresh-token.model';
import { IUser } from '../models/user/user.model';

export interface ITokens {
  access: string;
  refresh: IRefreshToken;
}

interface IDecodedAccessToken {
  exp: Date;
  iat: Date;
  user: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly LS_REFRESH_KEY = 'refresh-token';

  private _isAuth$$ = new ReplaySubject<boolean>(1);
  private _user$$ = new ReplaySubject<IUser>(1);
  private _accessToken$$ = new ReplaySubject<string>(1);

  isAuth$: Observable<boolean> = this._isAuth$$.asObservable();
  user$: Observable<IUser> = this._user$$.asObservable();
  accessToken$: Observable<string> = this._accessToken$$.asObservable();

  constructor(
    @Inject(API_URL)
    private _apiUrl: string,
    private _http: HttpClient,
    private _LSServece: LocalStorageService,
  ) {
    this._refreshTokens();
  }

  auth$(login: string, password: string): Observable<IUser | undefined> {
    return this._http
      .post<{ refresh: IRefreshToken; user: IUser; }>(
        `${this._apiUrl}/auth`,
        { login, password },
        {
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        map(e => {
          this._isAuth$$.next(true);
          const refresh = e.body?.refresh;
          const access = e.headers
            .get('Authorization')
            ?.replace('Bearer ', '');
          if (refresh && access) {
            this._updateTokens({ refresh, access })
            return e.body?.user;
          }
          throw false;
        }),
        catchError(error => {
          this._isAuth$$.next(false);
          return of(undefined);
        })
      );
  }

  signUpAsApplicant$(login: string, password: string): Observable<IUser | undefined> {
    return timer(200)
      .pipe(
        mapTo<number, IUser>({} as IUser),
        tap(e => {
          this._isAuth$$.next(true);
          this._user$$.next(e);
        }),
        catchError(error => {
          this._isAuth$$.next(false);
          return of(undefined);
        })
      );
  }

  signUpAsEmployer$(login: string, password: string, name: string, organization: string): Observable<IUser | undefined> {
    return timer(200)
      .pipe(
        mapTo<number, IUser>({} as IUser),
        tap(e => {
          this._isAuth$$.next(true);
          this._user$$.next(e);
        }),
        catchError(error => {
          this._isAuth$$.next(false);
          return of(undefined);
        })
      );
  }

  verifyPhone$(phone: string): Observable<void> {
    return timer(200).pipe(mapTo(undefined));
  }

  verifyEmail$(email: string): Observable<void> {
    return timer(200).pipe(mapTo(undefined));
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

  private _updateTokens(tokens: ITokens): void {
    this._LSServece.setItem(this.LS_REFRESH_KEY, tokens.refresh);
    this._accessToken$$.next(tokens.access);
    this._isAuth$$.next(true);
  }

  private _refreshTokens(): void {
    timer(200)
      .subscribe(() => this._isAuth$$.next(Math.random() >= 0.5));
  }

  private _decodeToken(token: string): IDecodedAccessToken {
    const decoded = JSON.parse(
      atob(token.split('.')[1])
    );

    if (decoded.user == null) { throw new Error('Token inavlid user'); }
    if (decoded.exp == null) { throw new Error('Token inavlid exp'); }
    if (decoded.iat == null) { throw new Error('Token inavlid iat'); }

    const user = decoded.user as string;
    const exp = new Date(decoded.exp * 1000);
    const iat = new Date(decoded.iat * 1000);

    return { user, exp, iat };
  }

}

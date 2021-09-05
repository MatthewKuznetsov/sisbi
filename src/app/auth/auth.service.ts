import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { API_URL } from '../core/core.module';
import { LocalStorageService } from '../core/localstorage.service';
import { IMessageDef, ResponseMessageResolverService } from '../core/response-message-resolver.service';
import { IRefreshToken } from '../models/refresh-token/refresh-token.model';
import { Gender, IUser, OtpType } from '../models/user/user.model';

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
  private _user$$ = new ReplaySubject<string>(1);
  private _accessToken$$ = new ReplaySubject<string>(1);

  isAuth$: Observable<boolean> = this._isAuth$$.asObservable();
  user$: Observable<string> = this._user$$.asObservable();
  accessToken$: Observable<string> = this._accessToken$$.asObservable();

  constructor(
    @Inject(API_URL)
    private _apiUrl: string,
    private _http: HttpClient,
    private _LSServece: LocalStorageService,
    private _messageResolver: ResponseMessageResolverService,
  ) { }

  auth$(login: string, password: string): Observable<IMessageDef> {
    return this._http
      .post<IRefreshToken>(
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
            const refresh = e.body;
            const access = e.headers.get('Authorization')?.replace('Bearer ', '');
            if (refresh && access) {
              this._updateTokens({ refresh, access })
              return this._messageResolver.resolve(e.ok);
            }
            throw false;
          }),
          catchError(error => {
            this._isAuth$$.next(false);
            return of(this._messageResolver.resolve(error));
          })
        );
  }

  signUp$(phone: string, password: string): Observable<IUser> {
    return timer(200).pipe(mapTo<number, IUser>({} as IUser));
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
    )
  }

  verifyEmailCode$(code: string, email: string): Observable<boolean> {
    return timer(200).pipe(
      map(() => Math.random() >= 0.5)
    )
  }

  private _updateTokens(tokens: ITokens): void {
      this._LSServece.setItem(this.LS_REFRESH_KEY, tokens.refresh);
      const accessToken = this._decodeToken(tokens.access);
      this._accessToken$$.next(tokens.access);
      this._user$$.next(accessToken.user);
      this._isAuth$$.next(true);
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

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    return this._authService.isAuth$
      .pipe(
        take(1),
        tap(e => !e && this._router.navigate(['/sign-in'])),
      );
  }

}

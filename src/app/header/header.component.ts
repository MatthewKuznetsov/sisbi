import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { IUser, Role } from '../models/user/user.model';

@Component({
  selector: 'sis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  user$: Observable<IUser>;
  isAuth$: Observable<boolean>;
  isEmployer$: Observable<boolean>;

  constructor(authService: AuthService) {
    this.user$ = authService.user$;
    this.isAuth$ = authService.isAuth$;
    this.isEmployer$ = this.user$.pipe(map(e => e && e.Role === Role.Employer));
  }

}

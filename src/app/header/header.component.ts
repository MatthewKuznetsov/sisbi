import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User, Role } from '../models/user/user.model';

@Component({
  selector: 'sis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  user$: Observable<User | undefined>;
  isEmployer$: Observable<boolean>;

  constructor(authService: AuthService) {
    this.user$ = authService.user$;
    this.isEmployer$ = this.user$.pipe(map(e => (e || false) && e.Role === Role.Employer));
  }

}

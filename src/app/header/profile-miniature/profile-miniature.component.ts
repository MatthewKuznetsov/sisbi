import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'sis-profile-miniature',
  templateUrl: './profile-miniature.component.html',
  styleUrls: ['./profile-miniature.component.scss']
})
export class ProfileMiniatureComponent {

  @Input() user!: User;
  opened = false;

  constructor(private _authService: AuthService) { }

  logOut(): void {
    this._authService.logOut();
  }

}

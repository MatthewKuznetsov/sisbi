import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'sis-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  @Input() user!: User;

  getAvatarUrl(): string {
    return this.user.Avatar;
  }

  getFullName(): string {
    return this.user.getDisplayName();
  }

}

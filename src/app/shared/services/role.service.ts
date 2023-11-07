import { Injectable } from '@angular/core';
import { AdminUser, User } from 'src/app/auth/services/auth.service';

export enum UserType {
  Admin,
  Moderator,
  Basic,
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  public isAdmin(user: User): user is AdminUser {
    return user.type === UserType.Admin;
  }
}

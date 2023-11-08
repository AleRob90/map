import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { UserType } from 'src/app/shared/services/role.service';

export interface User {
  id: string;
  type: UserType;
  username: string;
  email: string;
}

export interface AdminUser extends User {
  type: UserType.Admin;
}
export interface ModeratorUser extends User {
  type: UserType.Moderator;
}
export interface BasicUser extends User {
  type: UserType.Basic;
}

export interface JwtResponse {
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user$ = new BehaviorSubject<User | null>(null);

  public user = this.user$.asObservable();

  private readonly httpService = inject(HttpService);

  public isLogged(): boolean {
    return this.user$.value !== null;
  }

  public login(credentials: LoginRequest): Observable<User> {
    return this.httpService
      .post<LoginRequest, JwtResponse>('/auth/login', credentials)
      .pipe(
        map((jwt: JwtResponse) => this.storeToken(jwt)),
        switchMap(() => this.getUser())
      );
  }

  private storeToken(jwt: JwtResponse): void {
    localStorage.setItem('token', jwt.token);
    localStorage.setItem('refreshToken', jwt.token);
  }

  public getUser() {
    return this.httpService.get<User>('/auth/user').pipe(
      map((user: User) => {
        this.user$.next(user);
        return user;
      })
    );
  }
}

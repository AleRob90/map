import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getEmailValidator } from '../../../shared/validators/common.validators';

import { BehaviorSubject, catchError, finalize } from 'rxjs';

interface LoginForm {
  email: EmailControl;
  password: PasswordControl;
}

type EmailControl = FormControl<string>;
type PasswordControl = FormControl<string>;

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  public emailControl: EmailControl = new FormControl<string>('', {
    validators: [Validators.required, getEmailValidator()],
    nonNullable: true,
  });
  public passwordControl: PasswordControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  public form = new FormGroup<LoginForm>({
    email: this.emailControl,
    password: this.passwordControl,
  });

  public submitting$ = new BehaviorSubject<boolean>(false);

  private readonly authService = inject(AuthService);

  constructor() {
    this.authService.user.pipe(takeUntilDestroyed()).subscribe(user => {
      if (user != null) {
        alert(`You logged in as ${user.username}.`);
      }
    });
  }

  public submit(): void {
    const { email, password } = this.form.getRawValue();
    const credentials: LoginRequest = { email, password };
    this.submitting$.next(true);
    this.authService
      .login(credentials)
      .pipe(
        takeUntilDestroyed(),
        catchError((error: Error) => this.handleLoginError(error)),
        finalize(() => this.submitting$.next(false))
      )
      .subscribe(() => this.form.reset());
  }

  private handleLoginError(error: Error): never {
    this.form.setErrors({});
    throw new Error(error.message);
  }
}

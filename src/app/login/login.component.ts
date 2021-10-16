import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loggingIn = false;
  loginAttempted = false;
  loginSuccess = false;

  authStatusResolved = false;
  showLogin = false;

  private _$onDestroy = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authService
      .isAuthenticated()
      .pipe(takeUntil(this._$onDestroy))
      .subscribe((authStatus) => {
        if (authStatus) {
          this.router.navigateByUrl('/app');
        } else {
          this.showLogin = true;
        }

        this.authStatusResolved = true;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._$onDestroy.next();
    this._$onDestroy.complete();
  }

  async submit() {
    if (!this.form.valid) return;

    this.loggingIn = true;

    try {
      this.loginSuccess = await this.authService.login(
        this.username!.value,
        this.password!.value
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.loginAttempted = true;
      this.loggingIn = false;
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}

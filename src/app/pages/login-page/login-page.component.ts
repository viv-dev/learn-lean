import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'll-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loggingIn = false;
  loginAttempted = false;
  loginSuccess = false;

  private _$onDestroy = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.authService
      .isAuthenticated()
      .pipe(takeUntil(this._$onDestroy))
      .subscribe((authStatus) => {
        if (authStatus) {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/app');
          });
        }
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

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'll-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-lean';

  isAuthInitialised$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthInitialised$ = this.authService.isAuthInitialised();
  }
}

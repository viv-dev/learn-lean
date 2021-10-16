import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faSignOutAlt,
  faCog,
  faList,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'll-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent implements OnInit {
  // Font Awesome Icons
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faList = faList;
  faHeart = faHeart;
  faHome = faHome;

  // Variables for handling sidebar state
  isMobile = true;
  opened = true;

  // Media subscription to change the sidebar mode on mobile view
  mediaSubscription$: Subscription;

  constructor(
    private authService: AuthService,
    private mediaObserver: MediaObserver
  ) {
    // Helper for parsing breakpoint aliases
    const getAlias = (MediaChange: MediaChange[]) => {
      return MediaChange[0].mqAlias;
    };

    // Subscribe to media breakpoints
    this.mediaSubscription$ = this.mediaObserver
      .asObservable()
      .pipe(
        distinctUntilChanged(
          (x: MediaChange[], y: MediaChange[]) => getAlias(x) === getAlias(y)
        )
      )
      .subscribe((changes: MediaChange[]) => {
        changes.forEach((change) => {
          if (change.mqAlias === 'lt-md') {
            this.isMobile = true;
            this.opened = false;
          } else {
            this.isMobile = false;
            this.opened = true;
          }
        });
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.mediaSubscription$.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  closeIfMobile() {
    if (this.isMobile) {
      this.opened = false;
    }
  }
}

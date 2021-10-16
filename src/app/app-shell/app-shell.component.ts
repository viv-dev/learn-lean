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
  mode = 'side';
  opened = true;

  // Media subscription to change the sidebar mode on mobile view
  mediaSubscription$: Subscription;

  constructor(
    private authService: AuthService,
    private mediaObserver: MediaObserver,
    private router: Router
  ) {
    // Subscribe to media breakpoints
    this.mediaSubscription$ = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
          this.mode = 'over';
          this.opened = false;
        } else {
          this.mode = 'side';
          this.opened = true;
        }
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.mediaSubscription$.unsubscribe();
  }

  logout() {
    // this.authService.logout();
  }

  closeIfMobile() {
    if (this.mode === 'over') {
      this.opened = false;
    }
  }
}

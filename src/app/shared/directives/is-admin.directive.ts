import {
  Directive,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[isAdmin]',
})
export class IsAdminDirective implements OnDestroy {
  /** Subscription to keep track of auth state */
  authStateSubscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {
    this.authStateSubscription = this.authService
      .getUserId()
      .pipe(
        map(
          (id) =>
            !!(
              id &&
              (id === 'CN5FQ3vLqjQqDWrOTXC8LLj17OR2' ||
                id === '5b3cwNFyBzTDbKRZyPrQeXwLKoE3')
            )
        )
      )
      .subscribe((isAdmin: boolean) => {
        if (isAdmin) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }
}

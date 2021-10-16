import { Injectable, OnDestroy } from '@angular/core';
import {
  EmailAuthProvider,
  UserCredential,
  User,
  Auth,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$: BehaviorSubject<User | null>;
  private authStatus$: Subject<boolean>;

  constructor(private fireAuth: Auth, private router: Router) {
    this.user$ = new BehaviorSubject<User | null>(this.fireAuth.currentUser);
    this.authStatus$ = new BehaviorSubject<boolean>(
      !!this.fireAuth.currentUser
    );

    this.fireAuth.onAuthStateChanged((user: User | null) => {
      this.user$.next(user);
      this.authStatus$.next(!!user);
    });
  }

  ngOnDestroy() {
    this.user$.complete();
    this.authStatus$.complete();
  }

  /**
   * Returns an observable specifying the current authentication status as an observable
   */
  isAuthenticated(): Observable<boolean> {
    return this.authStatus$;
  }

  /**
   * Returns the current user as an observable
   */
  getUser(): Observable<User | null> {
    return this.user$;
  }

  /**
   * Returns the current User ID as a promise
   */
  getUserId(): Observable<string | null> {
    return this.user$.pipe(map((user) => (user ? user.uid : null)));
  }

  /**
   * Takes in the user entered email and password and attempts
   * to authenticate the user with the fireAuth service.
   *
   * The success value is returned as a boolean.
   *
   * @param email user account email
   * @param password user account password
   */
  login(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.fireAuth, email, password).then(
      (userCred) => !!userCred
    );
  }

  /**
   * Function used to refresh the user token. By default, users will
   * remain 'logged in' with a valid token for a period of time, allowing
   * them to access and use standard firebase features (e.g. database access).
   *
   * However, in order to be able to change sensivite user info like password/email,
   * the user token must be relatively 'fresh'. This function allows you to refresh
   * the user token so other actions, like changing email/passwords can be performed.
   *
   * Refreshing the users credentials requires their password.
   *
   * @param password user account password
   */
  async reauthenticate(password: string): Promise<UserCredential | undefined> {
    try {
      const currentUser = await this.getUser().pipe(take(1)).toPromise();
      const authCred = await EmailAuthProvider.credential(
        currentUser!.email!,
        password
      );
      return reauthenticateWithCredential(currentUser!, authCred);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function that allows the user to change the account email.
   *
   * @param newEmail new email to use
   * @param password user account password
   */
  changeEmail(newEmail: string, password: string): Promise<void> {
    return this.reauthenticate(password)
      .then(() => this.getUser().pipe(take(1)).toPromise())
      .then((currentUser) => updateEmail(currentUser!, newEmail));
  }

  /**
   * Function that allows
   * @param newPassword new user password
   * @param oldPassword old user password
   */
  changePassword(newPassword: string, oldPassword: string): Promise<void> {
    return this.reauthenticate(oldPassword)
      .then(() => this.getUser().pipe(take(1)).toPromise())
      .then((currentUser) => updatePassword(currentUser!, newPassword));
  }

  /**
   * Logs the current user out of the system
   */
  async logout(): Promise<void> {
    this.fireAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(console.log);
  }
}

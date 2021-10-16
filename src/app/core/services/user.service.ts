import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { LLUser } from '../models/users.model';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$: Observable<LLUser>;

  constructor(private authService: AuthService, private fireStore: Firestore) {
    // this.getUserDataFromDB();
  }

  ngOnDestroy() {}

  getUserProfile(): Observable<LLUser> {
    return this.user$;
  }

  // TODO: Analyse if this level of abstraction is required
  async updateUserProfile(newUserData: Partial<LLUser>): Promise<boolean> {
    let success = false;

    return success;
  }

  async changeEmail(newEmail: string, password: string): Promise<boolean> {
    let success = false;
    await this.authService
      .changeEmail(newEmail, password)
      .then(async (message) => {
        success = true;
        console.log('Email change success!');
      })
      .catch((error) => {
        console.log('Email change failureeeee!');
        console.log(error);
        success = false;
      });

    return success;
  }

  async changePassword(
    newPassword: string,
    oldPassword: string
  ): Promise<boolean> {
    let success = false;
    await this.authService
      .changePassword(newPassword, oldPassword)
      .then(async (message) => {
        success = true;
        console.log('Password change success!');
        console.log(message);
      })
      .catch((error) => {
        console.log('Password change failureeeee!');
        console.log(error);
        success = false;
      });

    return success;
  }

  private getUserDataFromDB(): void {
    // this.user$ = this.getDocumentWithUserId<IUserAccount>(
    //   USER_ACCOUNT_COLLECTION,
    // ).pipe(shareReplay(1));
  }

  // private getDocumentWithUserId<T>(path: string): Observable<T> {
  //   return this.authService.getUser().pipe(
  //     switchMap(user => {
  //       if (user) {
  //         return this.fireStore
  //           .doc(path + `/${user.uid}`)
  //           .snapshotChanges()
  //           .pipe(map(snap => MapDocSnap<T>(snap)));
  //       } else {
  //         return of(null);
  //       }
  //     }),
  //   );
  // }
}

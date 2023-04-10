import { Component, OnDestroy } from '@angular/core';
import { deleteUser } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DEFAULT_PHOTO_URL } from 'src/app/constants';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  sub = new Subscription();
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    private userService: UserService
  ) {}

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.sub = this.authService
      .emailLogin(form.value.email, form.value.password)
      .subscribe({
        next: (user) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.notify.showNotification({ message: err.message, type: 'error' });
          this.isLoading = false;
        },
      });
  }
  signInWithGoogle() {
    this.isLoading = true;
    this.authService.loginWithGmail().subscribe({
      next: (userInfo) => {
        if (userInfo?.isNewUser) {
          const newUser = {
            firstname: userInfo.profile!['given_name'] as string,
            lastname: userInfo!.profile!['family_name'] as string,
            photoURL: DEFAULT_PHOTO_URL,
            codeShared: 0,
            email: userInfo!.profile!['email'] as string,
            sub: 0,
            rollover: false,
            averageRatings: 0,
          };
          this.userService.createUser(newUser, userInfo.credential.uid).then(() => {
            this.notify.showNotification({ message: `A new account has been created with ${newUser.email}`, type: 'success' });
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          })
        } else {
          this.isLoading = false
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.notify.showNotification({ message: error.message, type: 'error' });
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

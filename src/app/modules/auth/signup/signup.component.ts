import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/validators';
import { NotificationService } from 'src/app/services/notification.service';
import { DEFAULT_PHOTO_URL } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService,
    private userService: UserService
  ) {
    this.signUpForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwordForm: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
          ]),
          confirmPassword: new FormControl('', Validators.required),
        },
        [CustomValidators.MatchValidator('password', 'confirmPassword')]
      ),
    });
  }

  get passwordMatchError() {
    return this.signUpForm.controls['passwordForm'].getError('mismatch') &&
      this.signUpForm.controls['passwordForm'].get('confirmPassword')?.touched
      ? 'password mis-match'
      : null;
  }
  get emailError() {
    if (
      this.signUpForm.controls['email']?.touched &&
      !this.signUpForm.controls['email'].valid
    ) {
      return this.signUpForm.controls['email'].getError('required')
        ? 'field is required'
        : 'invalid format';
    }
    return null;
  }

  get passwordError() {
    if (
      this.signUpForm.controls['passwordForm']?.get('password')?.touched &&
      !this.signUpForm.controls['passwordForm']?.get('password')?.valid
    ) {
      return this.signUpForm.controls['passwordForm']
        ?.get('password')
        ?.getError('required')
        ? 'field is required'
        : 'invalid password';
    }
    return null;
  }

  get firstNameError() {
    if (
      this.signUpForm.controls['firstname']?.touched &&
      !this.signUpForm.controls['firstname'].valid
    ) {
      return this.signUpForm.controls['firstname'].getError('required')
        ? 'field is required'
        : 'Too long';
    }
    return null;
  }
  get lastNameError() {
    if (
      this.signUpForm.controls['lastname']?.touched &&
      !this.signUpForm.controls['lastname'].valid
    ) {
      return this.signUpForm.controls['lastname'].getError('required')
        ? 'field is required'
        : 'Too long';
    }
    return null;
  }

  ngOnInit(): void {}

  signUpWithGoogle() {
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
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          })
        } else {
          this.notify.showNotification({ message: `You are already signed In as ${userInfo!.profile!['email']}`, type: 'success'})
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.notify.showNotification({ message: error.message, type: 'error'})
        this.isLoading = false;
      }
    })
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.signUpForm);
    const firstname = this.signUpForm.value['firstname'];
    const lastname = this.signUpForm.value['lastname'];
    const email = this.signUpForm.value['email'];
    const password = this.signUpForm.value['passwordForm'].password;
    console.log(password);

    this.authService
      .emailSignUp(email, password, firstname, lastname)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      }).catch((err) => {
        this.isLoading = false;
        this.notify.showNotification({ message: err.message, type: 'error'})
      })
  }
}

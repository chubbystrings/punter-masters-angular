import { DEFAULT_PHOTO_URL } from './../constants/index';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { defer, from, map, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private auth: Auth,
    private router: Router,
    private userService: UserService
  ) {}

  emailLogin(email: string, password: string) {
    return defer(() => signInWithEmailAndPassword(this.auth, email, password));
  }

  async emailSignUp(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    const defaultPhoto = DEFAULT_PHOTO_URL;
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = {
      firstname,
      lastname,
      codeShared: 0,
      photoURL: defaultPhoto,
      email,
      sub: 0,
      rollover: false,
      averageRatings: 0,
    };
    await this.userService.createUser(newUser, credential.user.uid);
    await sendEmailVerification(credential.user);
    await updateProfile(credential.user, {
      photoURL: defaultPhoto,
    });
  }

  loginWithGmail() {
    // get provider, sign in
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((credential) => {
        return {
          ...getAdditionalUserInfo(credential),
          credential: credential.user
        }
      })
    );
  }

  signOut(): void {
    signOut(this.auth).then(() => {
      this.router.navigate(['auth']);
    });
  }
}

// email: 'blackprinceofccity@gmail.com';
// family_name: 'Emeka';
// given_name: 'Martins';
// granted_scopes: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile';
// id: '106405835003530310542';
// locale: 'en';
// name: 'Martins Emeka';
// picture: 'https://lh3.googleusercontent.com/a/AEdFTp6Ec562Vz_zFkDdndaoAfKlutHt8kQpgAk0Kcxp=s96-c';
// verified_email: true;

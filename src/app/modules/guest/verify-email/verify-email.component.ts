import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {

  email: string = ''
  constructor() {}

  ngOnInit(): void {
    const email = localStorage.getItem('unverified-user')

    if (email) {
      this.email = email
      localStorage.removeItem('unverified-user')
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { USER } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: USER | null = null;
  sub = new Subscription()

  constructor(private authService: AuthService, private userService: UserService){}

  ngOnInit(): void {
      this.sub = this.userService.user$.subscribe((user) => {
        this.user = user
        console.log(user)
      })
  }

  logout() {
    this.authService.signOut()
  }

  ngOnDestroy(): void {
      if(this.sub) {
        this.sub.unsubscribe()
      }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavigationService } from 'src/app/services/side-navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  sub = new Subscription();
  menuOpen = false

  constructor( private sideNavService: SideNavigationService ) {

  }
  ngOnInit(): void {
    this.sub = this.sideNavService.menu.subscribe((value) => {
      this.menuOpen = value
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  toggleNav(): void {
    this.sideNavService.toggleMenu()
  }

}

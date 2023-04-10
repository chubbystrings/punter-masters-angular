import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';
import { SideNavigationService } from 'src/app/services/side-navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  destroy = new Subscription()
  scrollValue = 0;
  headerClass = 'z-10 transition ease-out duration-200 py-[5px] px-[32px] md:px-[64px] lg:px-[120px] 2xl:px-[24px]  bg-light  flex justify-between items-center fixed top-0 w-full 2xl:w-[1200px] left-1/2 transform -translate-x-1/2 ';
  condHeader = ''



  constructor( private scrollService: ScrollService, private sideNavService: SideNavigationService) {
    this.destroy = scrollService.scrollY.subscribe((value) => {
      this.scrollValue = value
      this.condHeader = value > 0 ? 'shadow-[5px_10px_10px_0px_rgba(0,0,0,0.1)]' : 'bg-opacity-0'
    })
  }

  getYPosition(e: Event): number {

    return (e.target as any).documentElement.scrollTop;
  }

  handleMenu(): void {
    this.sideNavService.toggleMenu()
  }


  ngOnDestroy(): void {
    this.destroy.unsubscribe()
  }

}

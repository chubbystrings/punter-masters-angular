import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  destroy = new Subscription()
  scrollValue = 0;
  headerClass = 'z-10 transition ease-in-out duration-500 py-[5px] px-[32px] md:px-[64px] lg:px-[120px] w-full bg-light  flex justify-between items-center fixed top-0';
  condHeader = ''


  constructor( private scrollService: ScrollService) {
    this.destroy = scrollService.scrollY.subscribe((value) => {
      this.condHeader = value > 0 ? 'shadow-[5px_10px_10px_0px_rgba(0,0,0,0.1)]' : 'bg-opacity-0'
    })
  }

  getYPosition(e: Event): number {

    return (e.target as any).documentElement.scrollTop;
  }


  ngOnDestroy(): void {
    this.destroy.unsubscribe()
  }

}

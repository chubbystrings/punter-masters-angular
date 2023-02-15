import { ScrollService } from './services/scroll.service';
import { Component } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'punter-masters-angular';
  destroy = new Subject();
  scrollValue = 0;
  destroy$ = this.destroy.asObservable();

  constructor( private  scrollService: ScrollService) {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        this.scrollService.scrollY.next(this.getYPosition(e))
      });
  }

  getYPosition(e: Event): number {
    return (e.target as any).documentElement ?  (e.target as any).documentElement.scrollTop : (e.target as any).body.scrollTop
  }

  ngOnDestroy(): void {
    this.destroy.next(0);
  }

}

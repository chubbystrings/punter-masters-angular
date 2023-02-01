import { Component, HostListener } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  destroy = new Subject();
  scrollValue = 0;
  destroy$ = this.destroy.asObservable();

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => {
        this.scrollValue = this.getYPosition(e)
      });
  }

  getYPosition(e: Event): number {

    return (e.target as any).documentElement.scrollTop;
  }

  ngOnDestroy(): void {
    this.destroy.next(0);
  }
}

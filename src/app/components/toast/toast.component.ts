import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NOTIFY } from 'src/app/types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  show = false;
  sub!: Subscription;
  notify: NOTIFY = {
    type: 'info',
    message: '',
  };

  constructor(private notifyService: NotificationService) {}

  ngOnInit(): void {
    this.sub = this.notifyService.$show.subscribe((value) => {
      this.show = value;
      this.notify = this.notifyService.notify;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

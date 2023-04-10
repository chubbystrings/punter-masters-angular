import { NOTIFY } from './../types/index';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  $show = new Subject<boolean>();
  notify!: NOTIFY;

  constructor() {}

  showNotification(data: NOTIFY) {
    let message = this.errorResponse(data.message)
    if (message.match(/wrong password/i)) {
      message = "invalid credentials"
    }
    this.notify = {
      ...data,
      message
    };
    this.$show.next(true);
    setTimeout(() => {
      this.$show.next(false);
      this.notify = {
        message: '',
        type: 'error',
      };
    }, 5000);
  }

  errorResponse(err: string) {
    return err
      .replace(/(Error|auth|Firebase|\)|\(|:|\/)/g, '')
      .replace(/-/g, ' ');
  }
}

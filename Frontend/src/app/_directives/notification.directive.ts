import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';

@Directive({
  selector: '[appNotification]'
})
export class NotificationDirective implements OnInit, OnDestroy {
  @Input() notification$!: Observable<{ text: string, isError: boolean }>;
  private subscription!: Subscription;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.subscription = this.notification$.subscribe(notification => {
      this.showNotification(notification.text, notification.isError);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private showNotification(notification: string, isError: boolean) {
    if (notification.length > 0) {
      const text = document.createElement('h3');
      isError ? text.classList.add('notification-error') : text.classList.add('notification-ok');
      text.innerHTML = notification;
      this.el.nativeElement.appendChild(text);

      setTimeout(() => {
        this.el.nativeElement.removeChild(text);
      }, 2500);
    }
  }
}

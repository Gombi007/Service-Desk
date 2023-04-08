import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pending',
  template: `<img class="pending" src="assets/Pictures/spinner.gif" alt="loading..." *ngIf="isPending">`,
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent {
  @Input()
  isPending: boolean = false

}

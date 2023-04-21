import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket.model';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent {
  @Input() _ticket: Ticket | undefined;
  @ViewChild('details', { read: ElementRef, static: false }) details!: ElementRef;
  isFullscreen: boolean = false;

  constructor(private renderer: Renderer2) { }

  goFullscreen() {
    this.renderer.setStyle(this.details.nativeElement, 'background', 'var(--background-color)');
    document.documentElement.style.setProperty('--split-content-width-left', '0vw');
    this.isFullscreen = true;
  }

  goCompactView() {
    this.renderer.setStyle(this.details.nativeElement, 'background', 'var(--background-color)');
    document.documentElement.style.setProperty('--split-content-width-left', '70vw');
    this.isFullscreen = false;
  }
}
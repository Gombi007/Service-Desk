import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements AfterViewChecked {
  @Input() images: string[] = [];
  @ViewChild('selectedPicRef', { read: ElementRef, static: false }) selectedPicRef!: ElementRef;
  selectedPic: string = '';
  isImageUpdated: boolean = false;

  constructor() { };

  showSelectedPicture(picId: number) {
    if (this.selectedPic === this.images[picId]) {
      this.addOrRemoveClassToAnElement(this.selectedPicRef, false);
    }

    if (this.selectedPic !== this.images[picId]) {
      this.isImageUpdated = true;
      this.selectedPic = this.images[picId];
    }
  }

  addOrRemoveClassToAnElement(element: ElementRef, isScaleUp: boolean) {
    let classes = ['scale-up', 'scale-down', 'scale-down-immediately'];
    let nativeElement = element.nativeElement;

    if (element && isScaleUp) {
      if (nativeElement.classList.contains(classes[0])) {
        nativeElement.classList.remove(classes[0]);
        nativeElement.classList.add(classes[2]);
        nativeElement.classList.remove(classes[2]);
      }
      setTimeout(() => {
        nativeElement.classList.add(classes[0]);
      }, 1);
    }

    if (element && !isScaleUp) {
      nativeElement.classList.add(classes[1]);
      setTimeout(() => {
        this.selectedPic = '';
      }, 500)
    }
  }

  ngAfterViewChecked(): void {
    if (this.isImageUpdated && this.selectedPicRef) {
      this.isImageUpdated = false;
      this.addOrRemoveClassToAnElement(this.selectedPicRef, true);
    }
  }
}

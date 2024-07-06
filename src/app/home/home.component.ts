import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = ['assets/images/carousel-img-1.svg', 'assets/images/carousel-img-2.png', 'assets/images/carousel-img-1.svg'];
  haircareImages: string[] = ['assets/images/hair-care-img-1.png', 'assets/images/hair-care-img-2.png', 'assets/images/hair-care-img-1.png','assets/images/hair-care-img-2.png'];
  skincareImages: string[] = ['assets/images/skin-care-img-1.svg', 'assets/images/skin-care-img-2.png', 'assets/images/skin-care-img-1.svg','assets/images/skin-care-img-2.png'];
  skintalkImages: string[] = ['assets/images/skin-talk-img-1.png', 'assets/images/skin-talk-img-2.png', 'assets/images/skin-talk-img-3.png','assets/images/skin-talk-img-4.png'];
  understandingHairImages: string[] = ['assets/images/hair-img-1.png', 'assets/images/hair-img-2.png', 'assets/images/hair-img-3.png','assets/images/hair-img-4.png'];
  currentIndex: number = 0;
  transform: string = 'translateX(0%)';
  interval: any;
  startX: number = 0;
  currentTranslate: number = 0;
  prevTranslate: number = 0;
  startTranslate: number = 0;
  dragging: boolean = false;
  constructor() {}

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.showNextSlide();
    }, 5000);
  }

  showNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.transform = `translateX(-${this.currentIndex * 100}%)`;
  }

  startTouch(event: TouchEvent) {
    this.dragging = true;
    this.startX = event.touches[0].clientX;
    this.startTranslate = this.currentTranslate;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.dragging) return;
    const currentPosition = event.touches[0].clientX;
    const diff = currentPosition - this.startX;
    this.currentTranslate = this.startTranslate + diff;
    this.transform = `translateX(${this.currentTranslate}px)`;
  }

  endTouch() {
    if (!this.dragging) return;
    this.dragging = false;
    const movedBy = this.currentTranslate - this.startTranslate;
    if (movedBy < -100 && this.currentIndex < this.skintalkImages.length - 1) {
      this.currentIndex++;
    }
    if (movedBy > 100 && this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.setPositionByIndex();
  }

  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -100;
    this.transform = `translateX(${this.currentTranslate}%)`;
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

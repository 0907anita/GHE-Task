import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() title!: string;
  @Input() products!: any[];

  slideStyles() {
    return {
      'transform': 'translateX(0)' // Initial position
    };
}
}

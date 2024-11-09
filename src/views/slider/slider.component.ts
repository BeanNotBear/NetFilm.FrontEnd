import { Component, OnInit, OnDestroy } from '@angular/core';
import { SlideItem } from "../../models/slider.interfaces";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, OnDestroy {
  slides: SlideItem[] = [
    { image: 'https://m.media-amazon.com/images/I/816A4jWNyRL._AC_UF894,1000_QL80_.jpg', name: 'Switzsdfrsdfsdfsdfsdfsdfsdfsfs sdfhsdfhjshdf sdhfjsderland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { image: 'https://orangecubeproject.com/wp-content/uploads/2021/01/210109_HORIZONTAL_NAMES.jpg', name: 'Finland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { image: 'https://wallpapers.com/images/hd/fantastic-beasts-and-where-to-find-them-horizontal-poster-86utad5c6nr65k54.jpg', name: 'Iceland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { image: 'https://i.ebayimg.com/images/g/IUsAAOSwppBlLU6E/s-l1200.jpg', name: 'Australia', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { image: 'https://pursuitofitall.com/wp-content/uploads/2016/02/the-revenant-movie-poster-horizontal.jpg', name: 'Netherland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' },
    { image: 'https://pbs.twimg.com/media/D2jvOdmUgAALnnx.jpg', name: 'Ireland', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!' }
  ];

  buttonPause = "fa-solid fa-pause";

  private intervalId: any = null;

  ngOnInit(): void {
    // Start interval to call onNext every 3 seconds
    this.intervalId = setInterval(() => this.onNext(), 5000);
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onNext(): void {
    const [firstSlide, ...rest] = this.slides;
    this.slides = [...rest, firstSlide];
  }

  onPrev(): void {
    const lastSlide = this.slides[this.slides.length - 1];
    const rest = this.slides.slice(0, -1);
    this.slides = [lastSlide, ...rest];
  }

  getItemClass(index: number): string {
    return index === 0 || index === 1 ? 'full-width' : '';
  }

  onSlider() {
    if(this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.buttonPause = "fa-solid fa-play"
    } else {
      this.intervalId = setInterval(() => this.onNext(), 5000);
      this.buttonPause = "fa-solid fa-pause"
    }
  }
}

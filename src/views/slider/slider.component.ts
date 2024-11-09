import {Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent implements AfterViewInit{
  slides = [
    {title: 'Slide 1', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 2', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 3', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 4', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 5', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 6', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 7', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 7', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 7', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'},
    { title: 'Slide 7', content: 'Lorem ipsum dolor sit amet consectetur...', image: 'https://m.media-amazon.com/images/M/MV5BNTgwNDBhOGItNTIxZC00ZjMzLWFhZTYtOGNiM2MzYWViMWUwXkEyXkFqcGc@._V1_.jpg'}
  ];

  active = 3;

  ngAfterViewInit(): void {
    this.loadShow();
  }

  loadShow() {
    const items = document.querySelectorAll('.slider .item') as NodeListOf<HTMLElement>;
    let stt = 0;
    items[this.active].style.transform = `none`;
    items[this.active].style.zIndex = '1';
    items[this.active].style.filter = 'none';
    items[this.active].style.opacity = '1';
    items[this.active].style.transform = 'scale(1.2)';

    for (let i = this.active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = `-${stt}`;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 3 ? '0' : '0.6';
    }

    stt = 0;
    for (let i = this.active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = `-${stt}`;
      items[i].style.filter = 'blur(5px)';
      items[i].style.opacity = stt > 3 ? '0' : '0.6';
    }
  }

  nextSlide() {
    if (this.active < this.slides.length - 1) {
      this.active++;
      this.loadShow();
    }
  }

  prevSlide() {
    if (this.active > 0) {
      this.active--;
      this.loadShow();
    }
  }

  onClick() {
    alert('Clicked');
  }
}

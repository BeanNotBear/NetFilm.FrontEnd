import {Component, AfterViewInit, Output, EventEmitter, Input, OnInit, OnDestroy} from '@angular/core';
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent implements OnInit{
  @Input() sliders: MovieViewerDto[] = [];

  @Output() openDialog = new EventEmitter<string>();

  active = 3;

  ngOnInit(): void {
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
    if (this.active < this.sliders.length - 1) {
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

  onClick(movieId: string) {
    this.openDialog.emit(movieId);
  }
}

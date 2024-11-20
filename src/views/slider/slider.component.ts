import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild, Renderer2, SimpleChanges, OnChanges
} from '@angular/core';
import {MovieViewerDto} from "../../models/movieDtos/movie.viewer.dto";

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy{
  @Input() sliders: MovieViewerDto[] = [];
  @Output() openDialog = new EventEmitter<string>();

  active = 3;
  private resizeObserver: ResizeObserver | null = null;
  private initTimeout: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupResizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliders'] && !changes['sliders'].firstChange) {
      // Reset active slide when data changes
      this.active = 3;
      this.initSlider();
    }
  }

  ngAfterViewInit(): void {
    this.initSlider();
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.loadShow();
    });

    const container = document.querySelector('.container');
    if (container) {
      this.resizeObserver.observe(container);
    }
  }

  private initSlider(): void {
    // Clear any existing timeout
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
    }

    // Set a new timeout for initialization
    this.initTimeout = setTimeout(() => {
      if (this.sliders && this.sliders.length > 0) {
        this.loadShow();
      }
    }, 100); // Small delay to ensure DOM is ready
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

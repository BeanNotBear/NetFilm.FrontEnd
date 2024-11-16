import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RateComponent} from "../rate/rate.component";
import {MovieService} from "../../service/movie.service";
import {MovieResponseDto} from "../../models/movieDtos/movie.response.dto";
import {Router} from "@angular/router";
import {routes} from "../../routes/app.routes";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    RateComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() isOpen = false;
  @Input() movie!: MovieResponseDto;
  @Output() closeDialog = new EventEmitter<boolean>();
  allowHalf = true


  constructor(private movieService: MovieService,
              private router: Router) {
    console.log(this.movie)
  }

  onClose() {
    this.isOpen = false;
    this.closeDialog.emit(this.isOpen);
  }

  viewDetails() {
    this.router.navigate([`/movie/${this.movie.id}/details`])
  }

}

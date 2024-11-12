import {Component} from '@angular/core';
import {VgApiService, VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {PlayerStateService} from "../../service/player-state.service";
import {Observable} from "rxjs";
import {RateComponent} from "../rate/rate.component";
import {CommentComponent} from "../comment/comment.component";
import {ContentDirective} from "../../directives/content.directive";
import {TabComponent} from "../tab/tab.component";
import {TabDirective} from "../../directives/tab.directive";
import {MoviesComponent} from "../movies/movies.component";
import {MovieAreaComponent} from "../movie-area/movie-area.component";

@Component({
  selector: 'app-movie-watching',
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RateComponent,
    CommentComponent,
    ContentDirective,
    TabComponent,
    TabDirective,
    MoviesComponent,
    MovieAreaComponent
  ],
  templateUrl: './movie-watching.component.html',
  styleUrl: './movie-watching.component.scss'
})
export class MovieWatchingComponent {
  preload: string = 'auto';
  api!: VgApiService;

  playerState$!: Observable<string>;

  constructor(private playerState: PlayerStateService) { }

  ngOnInit() {
    this.playerState$ = this.playerState.state$;
  }

  onPlayerReady(api: VgApiService) {
    console.log('playerReady');
    this.api = api;
    this.api.getDefaultMedia().subscriptions.play.subscribe(
      (event) => {
        this.playerState.updatePlayerState('play');
      }
    );

    this.api.getDefaultMedia().subscriptions.pause.subscribe(
      (event) => {
        this.playerState.updatePlayerState('pause');
      }
    );

  }
}

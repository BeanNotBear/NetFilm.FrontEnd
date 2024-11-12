import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  private state: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public state$: Observable<string> = this.state.asObservable();

  constructor() {
  }

  updatePlayerState(playerState: string) {
    this.state.next(playerState);
  }
}

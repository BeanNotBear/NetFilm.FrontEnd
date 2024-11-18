import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  constructor(private apiService: ApiService) {
  }

  getParticipants() {
    return this.apiService.getParticipants();
  }
}

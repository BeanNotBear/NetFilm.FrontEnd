import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageResult} from "../models/common/pageResult.model";
import {delay, Observable} from "rxjs";
import {UserDto} from "../models/userDtos/userDto.model";
import {Role, RoleResponse} from "../models/roleDtos/role";
import { Participant } from '../models/participantDtos/participant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost:5042/api";

  constructor(private http: HttpClient) {
  }

  getUsersPagination(pageIndex: number, pageSize: number, searchTerm: string, sortBy: string, ascending: boolean) {
    return this.http.get<PageResult<UserDto>>('https://localhost:5042/api/Users/PageResult', {
      params: new HttpParams()
        .set('pageIndex', pageIndex)
        .set('pageSize', pageSize)
        .set('searchTerm', searchTerm)
        .set('sortBy', sortBy)
        .set('ascending', ascending)
    }).pipe(delay(0));
  }

  addRole(role: Role) {
    return this.http.post<RoleResponse>('https://localhost:5042/api/Roles', role).subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      }
    );
  }

  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(`${this.baseUrl}/Participants`, participant);
  }

  getAllParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.baseUrl}/Participants`);
  }

  putParticipant(participant: Participant, id: Number): Observable<Participant> {
    return this.http.put<Participant>(`${this.baseUrl}/Participants/${id}`, participant);
  }

  deleteParticipant(id: Number): Observable<Participant> {
    return this.http.delete<Participant>(`${this.baseUrl}/Participants/${id}`);
  }
}

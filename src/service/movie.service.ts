import { Injectable } from '@angular/core';
import {NzUploadFile} from "ng-zorro-antd/upload";
import {HttpRequest} from "@angular/common/http";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiService: ApiService) { }

  uploadMovie(file: NzUploadFile) {
    let formData = new FormData();
    if(file instanceof File) {
      formData.append('file', file);
    }
    return this.apiService.uploadFile(formData, 'POST');
  }
}

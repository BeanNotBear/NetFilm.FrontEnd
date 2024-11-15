import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {CountryDto} from "../models/countryDtos/country.dto";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apiService: ApiService) { }

  getCountries() {
    return this.apiService.getCountries();
  }
}

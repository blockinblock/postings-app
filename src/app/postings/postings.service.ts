import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i18IsoCountries from 'i18n-iso-countries';

import { environment } from '../../environments/environment';
import { Posting } from './posting.model';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class PostingsService {
  postingsList = [];

  constructor(private http: HttpClient) { }

  fetchPostings(): Observable<any> {
    i18IsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));

    return this.http
      .get(environment.url)
      .pipe(
        map(responseData => {
          const postingsArr = [];

          responseData['content'].forEach(element => {
            let id: string;
            let name: string;
            let city: string;
            let ccode: string;
            let country: string;
            let department: string;

            element.hasOwnProperty('id') ? id = element['id'] : id = '';
            this.postingsList.push(element['id']);
            element.hasOwnProperty('name') ? name = element['name'] : name = '';

            if (element.hasOwnProperty('location')) {
              if (element['location'].hasOwnProperty('country')) {
                ccode = element['location']['country'].toUpperCase();
                country = i18IsoCountries.getName(ccode, 'en', {select: 'official'});
              }
              element['location'].hasOwnProperty('city') ? city = element['location']['city'] : city = '';
            }

            if (element.hasOwnProperty('department')) {
              element['department'].hasOwnProperty('label') ? department = element['department']['label'] : department = '';
            }

            postingsArr.push(new Posting(id, name, city, country, department));
          });

          return postingsArr;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}

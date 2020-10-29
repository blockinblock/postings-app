import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i18IsoCountries from 'i18n-iso-countries';

import { environment } from '../../environments/environment';
import { Details } from './details.model';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  fetchDetails(id: string): Observable<any> {
    i18IsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    return this.http
    .get(`${environment.url}/${id}`)
    .pipe(
      map(responseData => {
        let name: string;
        let city: string;
        let ccode: string;
        let country: string;
        let jobDescriptionTitle: string;
        let jobDescriptionText: string;
        let qualificationsTitle: string;
        let qualificationsText: string;

        responseData.hasOwnProperty('name') ? name = responseData['name'] : name = '';

        if (responseData.hasOwnProperty('location')) {
          if (responseData['location'].hasOwnProperty('country')) {
            ccode = responseData['location']['country'].toUpperCase();
            country = i18IsoCountries.getName(ccode, 'en', {select: 'official'});
          }
          responseData['location'].hasOwnProperty('city') ? city = responseData['location']['city'] : city = '';
        }

        if (responseData.hasOwnProperty('jobAd')) {
          if (responseData['jobAd'].hasOwnProperty('sections')) {
            if (responseData['jobAd']['sections'].hasOwnProperty('jobDescription')) {
              if (responseData['jobAd']['sections']['jobDescription'].hasOwnProperty('title')) {
                jobDescriptionTitle = responseData['jobAd']['sections']['jobDescription']['title'];
              }

              if (responseData['jobAd']['sections']['jobDescription'].hasOwnProperty('text')) {
                jobDescriptionText = responseData['jobAd']['sections']['jobDescription']['text'];
              }
            }

            if (responseData['jobAd']['sections'].hasOwnProperty('qualifications')) {
              if (responseData['jobAd']['sections']['qualifications'].hasOwnProperty('title')) {
                qualificationsTitle = responseData['jobAd']['sections']['qualifications']['title'];
              }

              if (responseData['jobAd']['sections']['qualifications'].hasOwnProperty('text')) {
                qualificationsText = responseData['jobAd']['sections']['qualifications']['text'];
              }
            }
          }
        }

        return new Details(
          name,
          city,
          country,
          jobDescriptionTitle,
          jobDescriptionText,
          qualificationsTitle,
          qualificationsText);
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
}

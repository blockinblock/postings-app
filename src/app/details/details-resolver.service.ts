import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { DetailsService } from './details.service';
import { Details } from './details.model';

@Injectable()
export class DetailsResolver implements Resolve<Details> {
  constructor(private detailsService: DetailsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Details> | Promise<Details> | Details {
    return this.detailsService.fetchDetails(route.params['id']);
  }
}

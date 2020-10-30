import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { PostingsService } from '../postings/postings.service';

@Injectable()
export class DetailsGuard implements CanActivate {
  constructor(private postingsService: PostingsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = route['params']['id'];

    if (this.postingsService.postingsList.indexOf(id) === -1) {
      this.router.navigate(['/']);
    } else {
      return true;
    }
  }
}

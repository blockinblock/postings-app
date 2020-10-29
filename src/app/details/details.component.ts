import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Details } from './details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  listing: { id: number };
  details: Details;
  paramsSubscription: Subscription;
  isFetching = false;
  error = null;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.route.data.subscribe(data => {
      this.details = data['details'];
      this.isFetching = false;
    },
    error => {
      this.isFetching = false;
      this.error = error.message;
    });

    this.listing = {
      id: this.route.snapshot.params['id']
    };

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.listing.id = params['id'];
    });
  }

  onLoadPostings(): void {
    this.router.navigate(['']);
  }

  onHandleError(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}

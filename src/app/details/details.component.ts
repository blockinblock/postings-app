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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.details = data['details'];
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

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}

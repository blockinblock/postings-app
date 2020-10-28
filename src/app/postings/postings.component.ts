import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Posting } from './posting.model';

import { PostingsService } from './postings.service';

@Component({
  selector: 'app-postings',
  templateUrl: './postings.component.html',
  styleUrls: ['./postings.component.css']
})
export class PostingsComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  postingsSub: Subscription;
  isFetching = false;
  listings: Posting[];
  countries = ['All'];
  departments = ['All'];

  constructor(private postingsService: PostingsService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      country: new FormControl(this.countries[0]),
      department: new FormControl(this.departments[0])
    });

    this.postingsSub = this.postingsService.fetchPostings().subscribe(
      (responseData: Posting[]) => {
        this.isFetching = true;
        this.listings = responseData;
        this.countries = this.buildFilters(this.countries, responseData, 'country');
        this.departments = this.buildFilters(this.departments, responseData, 'department');
      },
      error => {
        this.isFetching = false;
        console.log(error.message);
      }
    );
  }

  buildFilters(arr: Array<any>, data: Posting[], filter: string): Array<string> {
    data.forEach(item => {
      if (!arr.includes(item[filter])) {
        arr.push(item[filter]);
      }
    });
    return arr;
  }

  onSubmit(): void {
    console.log(this.searchForm);
  }

  ngOnDestroy(): void {
    this.postingsSub.unsubscribe();
  }
}

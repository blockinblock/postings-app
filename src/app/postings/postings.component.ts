import { Component, OnDestroy, OnInit } from '@angular/core';
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
  error = null;
  listings: Posting[];

  unfiltered = 'All';
  countries = [this.unfiltered];
  departments = [this.unfiltered];
  filteredCountry = this.unfiltered;
  filteredDepartment = this.unfiltered;

  constructor(private postingsService: PostingsService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      country: new FormControl(this.countries[0]),
      department: new FormControl(this.departments[0])
    });

    this.searchForm.valueChanges.subscribe(value => {
      console.log(value);
      this.filteredCountry = value.country;
      this.filteredDepartment = value.department;
    });

    this.isFetching = true;
    this.postingsSub = this.postingsService.fetchPostings().subscribe(
      (responseData: Posting[]) => {
        this.isFetching = false;
        this.listings = responseData;
        this.countries = this.buildFilters(this.countries, responseData, 'country');
        this.departments = this.buildFilters(this.departments, responseData, 'department');
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
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

  onHandleError(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.postingsSub.unsubscribe();
  }
}

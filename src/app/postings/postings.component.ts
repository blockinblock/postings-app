import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Posting } from './posting.model';
import { PostingsService } from './postings.service';
import { State, FilterState, PostingsState } from '../state.service';

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
  oldFilterState: FilterState = null;
  oldPostingsState: PostingsState = null;

  constructor(private postingsService: PostingsService, private state: State) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      country: new FormControl(this.countries[0]),
      department: new FormControl(this.departments[0])
    });

    // Re-instate postings if previously set
    this.oldPostingsState = this.state.getPostingsState();
    if (this.oldPostingsState) {
      this.oldPostingsState = this.state.getPostingsState();
      this.listings = this.oldPostingsState.postings;
      this.buildAllFilters();
    } else {
      this.isFetching = true;
      this.postingsSub = this.postingsService.fetchPostings().subscribe(
        (responseData: Posting[]) => {
          this.isFetching = false;
          this.listings = responseData;
          this.state.savePostingsState({ postings: responseData });
          this.buildAllFilters();
        },
        error => {
          this.isFetching = false;
          this.error = error.message;
        }
      );
    }

    // Re-instate filters if previously set
    this.oldFilterState = this.state.getFilterState();
    if (this.oldFilterState !== undefined) {
      this.filteredCountry = this.oldFilterState['country'];
      this.filteredDepartment = this.oldFilterState['department'];
      this.resetFilterValues();
    }

    this.searchForm.valueChanges.subscribe(value => {
      this.filteredCountry = value.country;
      this.filteredDepartment = value.department;
      this.state.saveFilterState(value);
    });
  }

  buildAllFilters(): void {
    if (this.listings) {
      this.countries = this.buildFilter(this.countries, this.listings, 'country');
      this.departments = this.buildFilter(this.departments, this.listings, 'department');
    }
  }

  buildFilter(arr: Array<any>, data: Posting[], filter: string): Array<string> {
    data.forEach(item => {
      if (!arr.includes(item[filter])) {
        arr.push(item[filter]);
      }
    });
    return arr;
  }

  onReset(): void {
    this.filteredCountry = this.unfiltered;
    this.filteredDepartment = this.unfiltered;
    this.resetFilterValues();
  }

  resetFilterValues(): void {
    this.searchForm.patchValue({
      country: this.filteredCountry,
      department: this.filteredDepartment
    });
  }

  onHandleError(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.postingsSub) {
      this.postingsSub.unsubscribe();
    }
  }
}

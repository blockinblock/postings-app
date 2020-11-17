import { Posting } from './postings/posting.model';

export interface FilterState {
  country: string;
  department: string;
}

export interface PostingsState {
  postings: Posting[];
}

export class State {
  private filterState: FilterState;
  private postingsState: PostingsState;

  getFilterState(): FilterState {
    return this.filterState;
  }

  getPostingsState(): PostingsState {
    return this.postingsState;
  }

  saveFilterState(newState: FilterState): void {
    this.filterState = newState;
  }

  savePostingsState(newState: PostingsState): void {
    this.postingsState = newState;
  }
}

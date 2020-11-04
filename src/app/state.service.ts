export interface FilterState {
  country: string;
  department: string;
}

export class State {
  private state: FilterState;

  getState(): FilterState {
    return this.state;
  }

  saveState(newState: FilterState): void {
    this.state = newState;
  }
}

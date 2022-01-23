import {action, makeObservable, observable} from 'mobx';

class EventStore {
  refreshing = false;

  constructor() {
    makeObservable(this, {
      refreshing: observable,
      setRefreshing: action,
    });
  }
  setRefreshing(newValue) {
    this.refreshing = newValue;
  }
}

export const eventStore = new EventStore();

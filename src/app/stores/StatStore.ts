import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from '../api';

import { EventsStat, eventsStat, eventsTitles } from './data/events';

interface EventsByTimeStatRow {
  
}

type EventsByTimeStat = EventsByTimeStatRow[]

export class StatStore {


  titles = eventsTitles;
  events = eventsStat;

  @observable eventsByTime = observable.array<EventsByTimeStatRow>();

  @action
  loadServices() {
    return StatApi.web_categories()
      .then(action((records: EventsByTimeStat) => {
        this.eventsByTime.clear();
        records.forEach(record => this.eventsByTime.push(record));
        return this.eventsByTime;
      }))
  }

}

export default StatStore;


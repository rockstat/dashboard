import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from 'app/api';

import { eventsStat } from 'app/stores/data/events';
import { GroupsSeries, BandEventsStat, EventByTime } from 'app/types';

export class StatStore {
  events = eventsStat;

  eventsByGroups: GroupsSeries = {};
  eventsByTime: EventByTime = {}

  @action
  loadSeries() {
    return StatApi.events_stat()
      .then(action((records: BandEventsStat) => {
        this.eventsByGroups = {};
        this.eventsByTime = {};
        records.forEach(({ name, data }) => {
          this.eventsByGroups[name] = data.map(([t, v]) => {
            const dp = { x: t, y: Number(v) };
            this.eventsByTime[t] = this.eventsByTime[t] || {};
            this.eventsByTime[dp.x][name] = dp.y;
            return dp
          })
        });
        return this.eventsByGroups;
      }))
  }

}

export default StatStore;


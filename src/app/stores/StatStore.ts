import { observable, action, computed } from 'mobx';
import { BandApi, StatApi } from 'app/api';

import { GroupsSeries, BandEventsStat, EventByTime, BandCommonStat } from 'app/types';

export class StatStore {
  eventsByGroups: GroupsSeries = {};
  eventsByTime: EventByTime = {}
  commonStat: { [k: string]: Array<[string, number]> } = {}


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
      }))
  }

  @action
  loadCommon() {
    return StatApi.common_stat()
      .then(action((records: BandCommonStat) => {
        this.commonStat = {};
        records.forEach(({ name, data }) => {
          this.commonStat[name] = data;
        });
      }))
  }

}

export default StatStore;


import { ApiWrapper, Stub, BandEventsStat, BandCommonStat } from 'app/types'
import { requests } from 'app/lib/agent';

export const StatApi = {
  common_stat: () =>
    requests.get<BandCommonStat>(`/common_stat`),
  events_stat: () =>
    requests.get<BandEventsStat>(`/events_stat`),
};


import { ApiWrapper, Stub, BandEventsStat } from 'app/types'
import { requests } from 'app/lib/agent';

export const StatApi = {
  groups_stat: () =>
    requests.get<Stub>(`/groups_stat`),
  events_stat: () =>
    requests.get<BandEventsStat>(`/events_stat`),
};


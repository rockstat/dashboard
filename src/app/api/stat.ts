import { ApiWrapper, Stub } from '../types'
import { requests } from '../lib/agent';

export const StatApi = {
  dashboard_stat: () =>
    requests.get<Stub>(`/dashboard_stat`),
};


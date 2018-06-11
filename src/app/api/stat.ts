import { ApiWrapper, Stub } from '../types'
import { requests } from '../lib/agent';

export const StatApi = {
  web_categories: () =>
    requests.get<Stub>(`/dashboard_stat`),
};


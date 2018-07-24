import { ApiWrapper, Stub } from 'app/types'
import { requests } from 'app/lib/agent';

export const StatApi = {
  web_categories: () =>
    requests.get<Stub>(`/dashboard_stat`),
};


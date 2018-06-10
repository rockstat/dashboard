import { BandServicesList, ApiWrapper, BandImagesList, Stub } from '../types'
import { requests } from '../lib/agent';

export const BandApi = {
  images: () =>
    requests.get<BandImagesList>(`/images`),
  services: () =>
    requests.get<BandServicesList>(`/list`),
  create: (project) =>
    requests.post<Stub>(`/projects`, project),
  ads: (id, filter) =>
    requests.get<Stub>(`/projects/${id}/ads/${filter}`),
  getRegions: () =>
    requests.get<Stub>('/info/regions')
};


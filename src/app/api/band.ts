import { BandServicesList, ApiWrapper, BandImagesList, Stub } from '../types'
import { requests } from '../lib/agent';

export const BandApi = {
  images: () =>
    requests.get<BandImagesList>(`/list_images`),
  services: () =>
    requests.get<BandServicesList>(`/list`),
  create: (project) =>
    requests.post<Stub>(`/run/${project.key}`, project),
  deleteService: (name) =>
    requests.get<Stub>(`/rm/${name}`),
  ads: (id, filter) =>
    requests.get<Stub>(`/projects/${id}/ads/${filter}`),
  getRegions: () =>
    requests.get<Stub>('/info/regions')
};

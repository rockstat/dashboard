import { BandServicesList, ApiWrapper, BandImagesList, Stub } from 'app/types'
import { requests } from 'app/lib/agent';

export const BandApi = {
  images: () =>
    requests.get<BandImagesList>(`/list_images`),
  services: () =>
    requests.get<BandServicesList>(`/list`),
  run: (name: string, pos: string) =>
    requests.post<Stub>(`/run/${name}`, { pos: pos }),
  deleteService: (name) =>
    requests.get<Stub>(`/rm/${name}`),
  restratService: (name) => 
    requests.get<Stub>(`/restart/${name}`),
  stopService: (name) => 
    requests.get<Stub>(`/stop/${name}`),
  ads: (id, filter) =>
    requests.get<Stub>(`/projects/${id}/ads/${filter}`),
  setPos: (id, pos: string) =>
    requests.post<Stub>(`/set_pos/${id}`, { pos: pos }),
  getRegions: () =>
    requests.get<Stub>('/info/regions')
};

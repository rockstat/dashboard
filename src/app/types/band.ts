import { ObservableMap } from "mobx";

export type BandServicesList = BandService[];
export interface BandServicesDict {
  [k: string]: BandService
}
export type BandServicesMap =  ObservableMap<BandService>
export interface BandService {
  name: string;
  title: string;
  state: string;
  uptime?: number;
  pos?: {
    col?: number,
    row?: number
  };
  mem?: number;
  cpu?: number;
  sla?: number;
  meta: {
    managed: boolean;
    protected: boolean;
    persistent: boolean;
  }
}

export type BandImagesList = BandImage[];



export interface BandImage {
  name: string;
  base?: string;
  key?: string;
  path: string;
  title: string;
}

export type GenricCallee = <T>(url: string, body?: any) => Promise<T>;

export type ApiWrapper = { [k: string]: GenricCallee; }

export interface Stub {

}

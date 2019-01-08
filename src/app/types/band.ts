import { ObservableMap } from "mobx";

export type BandServicesList = BandService[];
export interface BandServicesDict {
  [k: string]: BandService
}
export type BandServicesMap = ObservableMap<BandService>
export interface BandServicePos {
  col?: number,
  row?: number
}
export interface BandService {
  name: string;
  title: string;
  state: string;
  uptime?: number;
  pos: BandServicePos;
  mem?: number;
  cpu?: number;
  sla?: number;
  meta: {
    managed: boolean;
    native: boolean;
    protected: boolean;
    persistent: boolean;
  }
}


export type BandCommonStatParam = {
  name: string,
  data: Array<[string, number]>
}

export type BandCommonStat = BandCommonStatParam[]

export interface BandEventStat {
  name: string,
  data: Array<[string, string]>
};
export type BandEventsStat = Array<BandEventStat>

export interface DataPoint {
  x: string | number;
  y: number;
}

export type EventByTime = { [k: string]: { [k: string]: number } };

export type GroupSeries = Array<DataPoint>;
export type GroupsSeries = { [k: string]: GroupSeries }

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

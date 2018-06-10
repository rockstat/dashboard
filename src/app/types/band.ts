
export type BandServicesList = BandService[];

export interface BandService {
  name: string;
  status: string;
}

export type BandImagesList = BandImage[];

export interface BandImage {
  name: string;
  base?: string;
  key?: string;
  path: string;
}

export type GenricCallee = <T>(url: string, body?: any) => Promise<T>;

export type ApiWrapper = { [k: string]: GenricCallee; }

export interface Stub {

}

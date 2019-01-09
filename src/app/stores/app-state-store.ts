import { observable, action, computed, autorun } from 'mobx';
import { subDays, differenceInDays } from 'date-fns';
import Sockette from 'sockette';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';

import { wsURL } from "app/lib/agent";
import { IObservableArray } from 'mobx/lib/types/observablearray';

export class AppStateStore {
  @observable period = 1;
  @observable offset = 0;
  @observable wsConnected = false;
  buffer: Array<any> = [];
  logsRepository: IObservableArray<any> = observable.array([]);
  ws: Sockette;
  mergeInterval: number;

  constructor() {
    this.mergeInterval = window.setInterval(this.flushLogsTicker, 1e3);
    this.connectWS();
  }

  @action
  setSocketState(state: boolean) {
    this.wsConnected = state;
  }

  connectWS() {
    this.ws = new Sockette(wsURL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => this.setSocketState(true),
      onmessage: this.handleMsg,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => this.setSocketState(false),
      onerror: e => console.log('Error:', e)
    });
  }

  formatMsg({ time, data, ...rest }: { time: string, data: string, rest: any[] }) {
    const json = data[0] === '{';    
    try{
      data = JSON.parse(data)
    }
    catch(err) {}
    return {
      time,
      json,
      data: json ? JSON.stringify(data, undefined, 1) : data,
      ...rest
    }
  }

  handleMsg = (e: MessageEvent) => {
    const sourceMsg = JSON.parse(e.data);
    const msg = this.formatMsg(sourceMsg);
    this.buffer.push(msg);
  }

  flushLogsTicker = () => {
    if (this.buffer.length) {
      const buffer = [...this.buffer];
      this.buffer = [];
      this.flushLogsBuffer(buffer);
    }
  }

  @action flushLogsBuffer = (buffer: Array<any>) => {
    this.logsRepository.splice(this.logsRepository.length, 0, ...buffer)
  }

  @computed get logs() {
    return this.logsRepository;
  }

  @computed get logsSize() {
    return this.logs.length;
  }

  @computed get fromDate() {
    return subDays(this.toDate, this.period)
  }

  @computed get toDate() {
    return subDays(new Date(), this.offset)
  }

  @action setToDate(date) {
    if (this.fromDate > this.toDate) {
      this.period = 0;
    }
  }

  get now() {
    return new Date();
  }
}

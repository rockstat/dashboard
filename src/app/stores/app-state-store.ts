import { observable, action, computed, autorun } from 'mobx';
import { subDays, differenceInDays } from 'date-fns';
import Sockette from 'sockette';
import { format as formatDate } from 'date-fns'


import { History } from 'history';
import {
  RouterStore as BaseRouterStore,
  syncHistoryWithStore
} from 'mobx-react-router';

import { wsURL } from "app/lib/agent";
import { IObservableArray } from 'mobx/lib/types/observablearray';

// extends BaseRouterStore
export class AppStateStore {

  @observable period = 1; // day by default
  @observable offset = 0; // from now

  buffer: Array<any> = [];
  logsRepository: IObservableArray<any> = observable.array([]);
  ws: Sockette;
  mergeInterval: number;

  constructor() {
    this.mergeInterval = window.setInterval(this.flushLogsTicker, 1e3);
    this.connectWS();
  }

  connectWS() {
    this.ws = new Sockette(wsURL, {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: this.handleMsg,
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
  }

  formatMsg({ time, data, ...rest }) {
    const json = data[0] === '{';
    const pdata = json ? JSON.parse(data) : data;
    return {
      time: time.substr(11), //formatDate(time, 'HH:mm:ss YY.MM.dd'),
      json,
      data: json ? JSON.stringify(pdata, undefined, 1) : pdata,
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
    console.log('buffer flushed, log len:', this.logsRepository.length)
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

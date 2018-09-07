import * as React from 'react';
import { Component, createElement } from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import { Header, ShowIf } from 'app/components';
import createSocket from "sockette-component";
import { wsURL } from "app/lib/agent";
import * as styles from './logs.scss';
import * as MMH3 from "imurmurhash";
import { PrismCode } from 'app/components/prism';
import { format as formatDate } from 'date-fns'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100
});

const Socket = createSocket({
  Component,
  createElement
});

export interface LogsState {
  buffer: Array<any>
  log: Array<any>
  autoScroll: boolean;
  scrollTo?: number;
}

export class Logs extends React.Component<{}, LogsState> {
  state = {
    ws: null,
    log: [],
    buffer: [],
    autoScroll: true,
    scrollTo: undefined
  }
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }
  onOpen = ev => {
    console.log("> Connected!", ev);
  };

  formatMsg({ time, data, ...rest }) {
    const json = data[0] === '{';
    const pdata = json ? JSON.parse(data) : data;
    return {
      time: formatDate(time, 'YYYY.MM.dd'),
      json,
      data: json ? JSON.stringify(pdata, undefined, 1) : pdata,
      ...rest
    }
  }

  onMessage = ev => {
    const msg = this.formatMsg(JSON.parse(ev.data));
    this.setState(({ buffer }) => ({ buffer: [...buffer, msg] }))
  };

  onReconnect = ev => {
    console.log("> Reconnecting...", ev);
  };

  componentWillMount() {
    setInterval(() => {
      this.setState(
        ({ buffer, log, autoScroll }) => {
          if (buffer.length) {
            const newlog = [...log.slice(0, 5000), ...buffer];
            const scrollTo = autoScroll ? newlog.length - 1 : undefined;
            return { log: newlog, buffer: [] , scrollTo}
          }
        }
      )
    }, 500);
  }

  //clientHeight: 456, scrollHeight: 2967, scrollTop: 2511}
  onScroll({ clientHeight, scrollHeight, scrollTop }) {
    this.setState(state => ({
      autoScroll: scrollTop === 0 ? state.autoScroll : scrollHeight - clientHeight === scrollTop
    }))
  }

  render() {
    return (
      <div>
        <div className='rockstat'>
          <Header />
          <Socket
            url={"ws://127.0.0.1:8089/logs"} //wsURL
            maxAttempts={25}
            onopen={this.onOpen}
            onmessage={this.onMessage}
            onreconnect={this.onReconnect}
          />
        </div>
        <div className={styles.AutoSizerWrapper}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                onScroll={this.onScroll}
                height={height}
                width={width}
                rowHeight={cache.rowHeight}
                rowCount={this.state.log.length}
                rowRenderer={this.renderRow}
                className={styles.List}
                overscanRowCount={3}
                scrollToAlignment={"end"}
                scrollToIndex={this.state.scrollTo}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  renderRow = ({ index, key, style, parent }) => {
    const item = this.state.log[index];
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({ measure }) => (
          <div key={key} className={styles.row} style={style}>
            <span className={styles.time}>{item.time}</span>
            <span className={styles.name}>{item.cname}</span>
            <span className={styles.content}>
              <PrismCode async={true} language={item.json ? "json" : 'inform7'}>{item.data}</PrismCode>
            </span>
          </div>

        )}
      </CellMeasurer>
    )
  }
}

import * as React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from "react-virtualized";
import { Header, ShowIf, BarLogs, OnlineStatus } from 'app/components';
import * as styles from './logs.scss';
import { PrismCode } from 'app/components/prism';
import { observer, inject } from 'mobx-react';
import { APP_STATE } from 'app/constants';
import { InjectedStores, AppStateStore } from 'app/stores';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100
});

export interface LogsState {
  scrollTo: number | undefined;
}
export interface LogsProps extends InjectedStores { }


@inject(APP_STATE)
@observer
export class Logs extends React.Component<LogsProps, LogsState> {
  state = {
    scrollTo: undefined
  }

  toggleAutoScroll = () => {
    this.props[APP_STATE].toggleAutoScroll()
    // this.setState((state, props) => {
    //   return { autoScroll: !state.autoScroll };
    // })
  }

  toggleLogsEnabled = () => {
    this.props[APP_STATE].toggleLogs()
    // this.setState((state, props) => {
    //   return { logsEnabled: !state.logsEnabled };
    // })
  }

  onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    // const autoScroll = scrollTop === 0 ? this.state.autoScroll : scrollHeight - clientHeight === scrollTop;
    // console.log(`on scroll autoScroll:${autoScroll}`)
    // this.setState({ autoScroll })
  }

  updateScroll() {
    const { maxScroll, setScrollTo, autoScroll } = this.props[APP_STATE] as AppStateStore;
    if (autoScroll) {
      const scrollTo = maxScroll
      // setScrollTo(scrollTo);
      this.setState({ scrollTo })
    } else {
      // setScrollTo(undefined);
      this.setState({ scrollTo: undefined })
    }
  }

  componentWillMount() {
    const { maxScroll, scrollTo } = this.props[APP_STATE] as AppStateStore;
    this.updateScroll();
  }

  componentWillReact() {
    this.updateScroll();
  }

  render() {
    const appState = this.props[APP_STATE] as AppStateStore;
    const { logs, logsSize, wsConnected, toggleLogs, logsEnabled, autoScroll} = appState
    // const {  } = this.state


    return (
      <div>
        <div className='rockstat'>
          <Header>
            <BarLogs autoScroll={autoScroll} logsEnabled={logsEnabled} toggleLogs={this.toggleLogsEnabled} toggleAutoScroll={this.toggleAutoScroll} />
            <OnlineStatus wsConnected={wsConnected}/>
          </Header>
        </div>
        <div className={styles.AutoSizerWrapper}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                onScroll={this.onScroll}
                height={height}
                width={width}
                rowHeight={cache.rowHeight}
                rowCount={logsSize}
                className={styles.List}
                overscanRowCount={3}
                scrollToAlignment={"end"}
                scrollToIndex={this.state.scrollTo}
                rowRenderer={this.renderRow}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }

  renderRow = ({ index, key, style, parent }) => {
    const item = this.props[APP_STATE].logs[index];
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

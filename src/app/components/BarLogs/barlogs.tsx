import * as React from 'react';
import * as cl from 'classnames';
import { LogsPlayIcon, LogsPauseIcon, LogsArrowDownIcon, LogsSearchIcon } from 'app/icons';
import * as styles from './barlogs.scss';
import Select from 'react-select';

interface ServiceOption {
  label: string;
  value: string;
}

interface BarLogsState {
  logStatus: string;
  servicesOptions: ServiceOption[];
  activeService: ServiceOption;
}

interface BarLogsProps {
  wsConnected: boolean;
  toggleAutoScroll: () => void;
  toggleLogs: () => void;
  autoScroll: boolean;
  logsEnabled: boolean;
}

export class BarLogs extends React.Component<BarLogsProps, BarLogsState> {
  state = {
    logStatus: 'play',
    servicesOptions: [
      {
        label: 'All services',
        value: 'All services'
      },
      {
        label: 'Name1',
        value: 'Name1'
      },
      {
        label: 'Name2',
        value: 'Name2'
      },
      {
        label: 'Name3',
        value: 'Name3'
      }
    ],
    activeService: {
      label: 'All services',
      value: 'All services'
    },
  }

  changeStatus = () => {
    const { logStatus } = this.state;

    this.setState({
      logStatus: logStatus == 'play' ? 'pause' : 'play'
    });
  }

  changeServices = (service: ServiceOption) => {
    this.setState({
      activeService: service
    })
  }

  render() {
    const { servicesOptions, activeService } = this.state;
    const { wsConnected, logsEnabled, toggleAutoScroll, toggleLogs, autoScroll } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <div className={styles.playBtnContainer}>
            <div
              className={cl(styles.play, { [styles.show]: !logsEnabled })}
              onClick={() => toggleLogs()}
            >
              <LogsPlayIcon />
            </div>
            <div
              className={cl(styles.pause, { [styles.show]: logsEnabled })}
              onClick={() => toggleLogs()}
            >
              <LogsPauseIcon />
            </div>
          </div>
          <div className={styles.arrowDown} onClick={() => toggleAutoScroll()}>
            <LogsArrowDownIcon enabled={autoScroll} />
          </div>
        </div>
        <div className={styles.changeServices}>
          <Select
            className={styles.selectContainer}
            options={servicesOptions}
            value={activeService}
            onChange={this.changeServices}
            clearable={false}
          />
        </div>
        <div className={styles.searchContainer}>
          <input />
          <div className={styles.searchIcon}>
            <LogsSearchIcon />
          </div>
        </div>
        <div className={styles.statusContainer}>
          {
            wsConnected ?
              <div className={styles.online}>
                <div className={styles.circle} />
                <div className={styles.text}>online</div>
              </div>
              :
              <div className={styles.offline}>
                <div className={styles.circle} />
                <div className={styles.text}>offline</div>
              </div>
          }
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import * as cl from 'classnames';
import { LogsPlayIcon, LogsPauseIcon, LogsArrowDownIcon, LogsSearchIcon } from 'app/icons';
import * as styles from './header-toolbar.css';
import Select from 'react-select';



interface OnlineStatusProps {
  wsConnected: boolean;
}

export class OnlineStatus extends React.Component<OnlineStatusProps, {}> {

  render() {
    const { wsConnected } = this.props;

    return (
      <div className={styles.container}>
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

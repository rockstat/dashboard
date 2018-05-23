import * as React from 'react';

import { CpuLine, CpuBgIcon } from '../../icons';

import * as styles from './style.scss';

export class CpuMeter extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.cpuContainer}>
        <div className={styles.cpuLineContainer}>

          <div className={styles.cpuLineBgAll}><CpuBgIcon /></div>
          <div className={styles.cpuLineBg}><CpuLine /></div>
          <div className={styles.cpuLineGreen}><CpuLine /></div>

        </div>
      </div>
    )
  }
}

import * as React from 'react';
import { CpuLine, ArrowIcon } from 'app/icons';

import * as styles from './style.css';

interface CpuMeterProps {
  cpu: number;
}

export class CpuMeter extends React.Component<CpuMeterProps, {}> {

  _cpuToDashoffset: () => string = (): string => {
    const { cpu } = this.props;
    const cof = 138 / 100;
    const proc = cpu * cof;
    const res = 138 - proc;

    return res.toFixed(1);
  }

  _cpuToDeg: () => number = (): number => {
    const { cpu } = this.props;
    const start = 27;
    const stop = 141;
    const cof = (stop - start) / 100;
    const res = cpu * cof + start;

    return res;
  }

  render() {
    const { cpu } = this.props;

    return (
      <div className={styles.cpuContainer}>
        <div className={styles.cpuLineContainer}>

          <div className={styles.cpuLineBg}><CpuLine /></div>
          <div className={styles.cpuLineGreen}><CpuLine strokeDashoffset={this._cpuToDashoffset()}/></div>
          <div 
            className={styles.arrow}
            style={{
              transform: `rotate(${this._cpuToDeg()}deg)`
            }}
          >
            <ArrowIcon />
          </div>
          <div className={styles.current}> { cpu } </div>

          <div className={styles.minMax}>
            <div className={styles.min}>0.0</div>
            <div className={styles.max}>100.0</div>
          </div>

        </div>
      </div>
    )
  }
}

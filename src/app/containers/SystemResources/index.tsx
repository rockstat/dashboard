import * as React from 'react';

import * as styles from './style.css';
import { CpuMeter } from 'app/components';
import { CircleComponent } from 'app/components';

export class SystemResources extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>SystemResources</div>
        <div className={styles.paramsContainer}>
          <div className={styles.usedSwap}>
            <CircleComponent 
              topText={'Used Swap'}
              bottomText={'%'} 
              value={50} 
              colorValue={'#ec4b2c'}
              toFixed={0}
            />
          </div>
          <div className={styles.diskRead}>
            <CircleComponent 
              topText={'Disk Read'}
              bottomText={'megabytes/s'}
              value={2.00012}
              colorValue={'#75a732'}
              toFixed={5}
            />
          </div>
          <div className={styles.diskkWrite}>
            <CircleComponent 
              topText={'Disk Write'}
              bottomText={'megabytes/s'}
              value={2.18}
              colorValue={'#ec4b2c'}
              toFixed={2}
            />
          </div>
          <div className={styles.cpuMeter}><CpuMeter cpu={39.5} /></div>
          <div className={styles.netInbound}>
            <CircleComponent 
              topText={'Net Inbound'}
              bottomText={'megabytes/s'}
              value={5.47}
              colorValue={'#75a732'}
              toFixed={2}
            />
          </div>
          <div className={styles.netOutbound}>
            <CircleComponent 
              topText={'Net Outbound'}
              bottomText={'megabytes/s'}
              value={10.47}
              colorValue={'#ec4b2c'}
              toFixed={2}
            />
          </div>
          <div className={styles.usedRam}>
            <CircleComponent 
              topText={'Used Ram'}
              bottomText={'%'} 
              value={2.9} 
              colorValue={'#e39c3a'}
              toFixed={1}
            />
          </div>
        </div>
      </div>
    )
  }
}

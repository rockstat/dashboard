import * as React from 'react';

import * as styles from './style.scss';
import { CpuMeter } from 'app/components';

export class SystemResources extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>SystemResources</div>
        <div className={styles.paramsCOntainer}>
          <CpuMeter />
        </div>
      </div>
    )
  }
}

import * as React from 'react';

import * as styles from './style.css';
import { SunnyIcon } from 'app/icons';
import { CirclIcon } from 'app/icons';

interface CircleComponentProps {
  topText: string;
  bottomText: string;
  value: number;
  colorValue: string;
  toFixed: number;
}

export class CircleComponent extends React.Component<CircleComponentProps, {}> {

  _renderValueBg: () => string = (): string => {
    const { value, toFixed } = this.props;
    const start = 95;
    const stop = 400;
    const cof = (stop - start) / 100;
    const res = value * cof;
    const result = stop - res;

    return result.toFixed(toFixed);
  }

  render() {
    const { topText, bottomText, value, colorValue } = this.props;

    return (
      <div className={styles.circleContainer}>

        <div className={styles.circleBg}><SunnyIcon /></div>
        
        <div className={styles.circleValue}>
          <CirclIcon color={colorValue} strokeDashoffset={this._renderValueBg()}/>
        </div>

        <div className={styles.value}> { value } </div>

        <div className={styles.topText}> { topText } </div>

        <div className={styles.bottomText}> { bottomText } </div>
      </div>
    )
  }
}

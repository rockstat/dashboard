import * as React from 'react';

import * as style from './style.scss';

export class LabelSub extends React.Component<{ title: string, subtitle: string }> {
  render() {
    const { title, subtitle } = this.props;
    
    return (
      <span className={style.infoContainerLabel}>
        <span className={style.infoContainerLabelTitle}>{title}</span>
        <span className={style.infoContainerLabelValue}>
          {subtitle}
        </span>
      </span>
    );
  }
}

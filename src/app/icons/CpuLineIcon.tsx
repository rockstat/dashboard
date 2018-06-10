import * as React from 'react';

interface CpuLineProps {
  strokeDashoffset?: string;
}

export class CpuLine extends React.Component<CpuLineProps, {}> {
  render() {
    const { strokeDashoffset } = this.props;

    return (
      <svg xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 588.7 226.2" xmlSpace="preserve">
      <path 
        d="M44.4,203.3C91.3,112.3,186.3,50,295.7,50c107.6,0,201.2,60.2,248.9,148.8"
        fill='none' stroke='#383b40' strokeWidth='100' strokeMiterlimit='10'
        strokeDashoffset={`${strokeDashoffset}%`}
      />
      </svg>
    )
  }
}

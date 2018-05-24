import * as React from 'react';

interface CirclIconProps {
  strokeDashoffset?: string;
  color: string;
}

export class CirclIcon extends React.Component<CirclIconProps, {}> {
  render() {
    const { strokeDashoffset, color } = this.props;

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258 258">
        <circle 
          fill='none'
          stroke={color}
          strokeDashoffset={`${strokeDashoffset}%`}
          strokeMiterlimit='10'
          strokeWidth='8px' cx="129" cy="129" r="125"
        />
      </svg>
    )
  }
}

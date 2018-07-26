import * as React from 'react';

export class PlayIcon extends React.Component<{}, {}> {
  render() {
    return (
      <svg viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M24 1H2C1.44772 1 1 1.44772 1 2V24C1 24.5523 1.44772 25 2 25H24C24.5523 25 25 24.5523 25 24V2C25 1.44772 24.5523 1 24 1ZM2 0C0.895431 0 0 0.895431 0 2V24C0 25.1046 0.895431 26 2 26H24C25.1046 26 26 25.1046 26 24V2C26 0.895431 25.1046 0 24 0H2Z" transform="translate(2 2)" fill="#222222"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M9.06543 5.34363L0.898804 0.0936299C0.510559 -0.156004 0 0.122805 0 0.58423V11.0842C0 11.5458 0.510559 11.8246 0.898804 11.575L9.06543 6.32495C9.42261 6.09534 9.42261 5.57324 9.06543 5.34363ZM7.67126 5.83423L1.16669 10.0157V1.65271L7.67126 5.83423Z" transform="translate(11.3333 9.16663)" fill="#28CFDA"/>
        <mask id="mask0_play_icon" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="9" width="10" height="12">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.06543 5.34363L0.898804 0.0936299C0.510559 -0.156004 0 0.122805 0 0.58423V11.0842C0 11.5458 0.510559 11.8246 0.898804 11.575L9.06543 6.32495C9.42261 6.09534 9.42261 5.57324 9.06543 5.34363ZM7.67126 5.83423L1.16669 10.0157V1.65271L7.67126 5.83423Z" transform="translate(11.3333 9.16663)" fill="white"/>
        </mask>
        <g mask="url(#mask0_play_icon)">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0H14V14H0V0Z" transform="translate(9 8)" fill="#28CFDA"/>
        </g>
      </svg>
    )
  }
}

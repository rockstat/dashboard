import * as React from 'react';
interface LogsArrowDownIconProps {
  enabled: boolean;
}
export const LogsArrowDownIcon = (props: LogsArrowDownIconProps) => {
  return (
    <svg viewBox={'0 0 26 26'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={"#222"} stroke="#333" d="M.5.5h25v25H.5z" />
      <g clipPath="url(#clip0_logs_arrow_down_icon)">
        <path strokeWidth={0} stroke="#333" fill={props.enabled ? '#8C00FF' : "#878787"} d="M19.965 12.87a.334.334 0 0 0-.308-.206h-3.651v-8.33A.333.333 0 0 0 15.673 4H10.34a.333.333 0 0 0-.333.333v8.33H6.343a.334.334 0 0 0-.236.57l6.647 6.67a.333.333 0 0 0 .472 0l6.667-6.67a.332.332 0 0 0 .072-.363z" />
      </g>
      <defs>
        <clipPath id="clip0_logs_arrow_down_icon">
          <path fill="#fff" transform="translate(5 4)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  )
};

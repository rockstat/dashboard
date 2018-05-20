
import * as React from 'react';

function DiscreteColorLegendItem(params: { [k: string]: any }) {
  const {
    color,
    disabled,
    onClick,
    orientation,
    onMouseEnter,
    onMouseLeave,
    title
  } = params;
  let className = `rv-discrete-color-legend-item ${orientation}`;
  if (disabled) {
    className += ' disabled';
  }
  if (onClick) {
    className += ' clickable';
  }
  return (
    <div {...{ className, onClick, onMouseEnter, onMouseLeave }}>
      <span
        className="rv-discrete-color-legend-item__color"
        style={disabled ? null : { background: color }} />
      <span className="rv-discrete-color-legend-item__title">
        {title}
      </span>
    </div>
  );
}

export default DiscreteColorLegendItem;

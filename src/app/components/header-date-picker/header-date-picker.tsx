import * as React from 'react';
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { format, parseDate, formatDate } from 'app/lib/date';

import * as styles from './header-date-picker.scss';


export interface HeaderDatePickerProps {
  fromDate: Date;
  toDate: Date;
  steps: StepValue[];
}

export type StepValue = { label: string, value: string };
export interface HeaderDatePickerState {
  from: Date;
  to: Date;
  changeOption: StepValue | null;
}

export class HeaderDatePickerComponent extends React.Component<HeaderDatePickerProps, HeaderDatePickerState> {

  to: DayPickerInput;
  timeout: number;

  constructor(props) {
    super(props);
    const { toDate, fromDate } = this.props;
    this.state = {
      to: toDate,
      from: fromDate,
      changeOption: null
    };
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  focusTo = () => {
    this.timeout = window.setTimeout(() => this.to.getInput().focus(), 0);
  }

  handleFromChange = (from: Date) => {
    this.setState({ from });
  }

  handleToChange = (to: Date) => {
    this.setState({ to });
  }

  changeStep = (value) => {
    // console.log(int.value)
    this.setState({ changeOption: value })
  }

  render() {

    const { from, to, changeOption } = this.state;
    const { steps } = this.props;
    const modifiers = { start: from, end: to };
    const now = new Date();

    return (
      <div className={styles.datepicker}>
        <div className="InputFromTo">
          <DayPickerInput
            value={from}
            placeholder="From"
            format={format}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: { from: from, to: to },
              disabledDays: { after: to },
              month: now,
              // fromMonth: from,
              toMonth: now,
              modifiers,
              numberOfMonths: 2,
              onDayClick: () => this.focusTo(),
            }}
            onDayChange={this.handleFromChange}
          />
          {' '}<span className={'InputFromTo-line'}>—</span>{' '}
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              placeholder="To"
              format={format}
              formatDate={formatDate}
              parseDate={parseDate}
              required
              dayPickerProps={{
                selectedDays: { from: from, to: to },
                disabledDays: { before: from, after: new Date() },
                modifiers,
                month: now,
                toMonth: now,
                numberOfMonths: 2,
              }}
              onDayChange={this.handleToChange}
            />
          </span>
        </div>
        <div className={styles.stepContainer}>
          <Select
            value={changeOption}
            onChange={this.changeStep}
            options={steps}
            clearable={false}
            multi={false}
            removeSelected={false}
            required
            placeholder={'Step'}
          />
        </div>
      </div>
    )
  }
}


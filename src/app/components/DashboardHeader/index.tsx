import * as React from 'react';
import * as styles from './style.scss';

import { DayPickerInputProps, DayPickerProps } from 'react-day-picker/types';
import { DayPickerInput as DayPickerInputClass } from 'react-day-picker/types/DayPickerInput';
import * as moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import * as MomentLocaleUtils from 'react-day-picker/moment';

import Select from 'react-select';
import { options as selectOption, stepValueProps } from '../../constants/stepValues';

// Make sure moment.js has the required locale data
import 'moment/locale/ru';

interface DashboardHeaderProps {}

interface DashboardHeaderTypes extends DayPickerInputClass {}

interface DashboardHeaderState {
  from: undefined | DashboardHeaderTypes;
  to: undefined | DashboardHeaderTypes;
  options: Array<stepValueProps>;
  changeOption: stepValueProps | null;
}

export class DashboardHeader extends React.Component<DashboardHeaderProps, DashboardHeaderState> {
  state = {
    from: undefined,
    to: undefined,
    options: selectOption,
    changeOption: null
  };

  to: DashboardHeaderTypes;
  timeout: number;

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  focusTo = () => {
    this.timeout = window.setTimeout(() => this.to.getInput().focus(), 0);
  }

  showFromMonth =() => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange = (from: DashboardHeaderTypes) => {
    this.setState({ 
      from: from
     });
  }

  handleToChange = (to: DashboardHeaderTypes) => {
    this.setState({ 
      to: to
     }, this.showFromMonth);
  }

  changeStep = (e) => {
    this.setState({
      changeOption: e
    })
  }

  render() {
    const { from, to, options, changeOption } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className={styles.headerContent}>

        <h1 className={styles.title}>DASHBOARD</h1>

        <div className={styles.selctedContainer}>
        
          <div className="InputFromTo">
            <DayPickerInput
              value={from}
              localeUtils={MomentLocaleUtils}
              placeholder="From"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => this.to.getInput().focus(),
              }}
              onDayChange={this.handleFromChange}
            />{' '}<span className={'InputFromTo-line'}>—</span>{' '}
          <span className="InputFromTo-to">
            <DayPickerInput
              ref={el => (this.to = el)}
              value={to}
              localeUtils={MomentLocaleUtils}
              placeholder="To"
              format="LL"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
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
              options={options}
              clearable={false}
              multi={false}
              removeSelected={false}
              required
              placeholder={'Step'}
            />
        </div> 
        </div>
      </div>
    );
  }
}

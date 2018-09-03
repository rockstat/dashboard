import * as React from 'react';
import { Link } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Select from 'react-select';
import * as styles from './style.scss';
import { LogoIcon } from 'app/icons';
import { menu } from 'app/constants';
import { options as selectOption, stepValueProps } from 'app/constants/stepValues';
import { format, parseDate, formatDate } from 'app/lib/date';
import { observer, inject } from 'mobx-react';
import { STORE_APP_STATE } from 'app/constants';
import { AppStateStore } from 'app/stores';

export interface HeaderProps {

}
export interface HeaderState {
  from: Date;
  to: Date;
  options: stepValueProps[];
  changeOption: stepValueProps | null;
}

@inject(STORE_APP_STATE)
@observer
export class Header extends React.Component<HeaderProps, HeaderState> {

  to: DayPickerInput;
  timeout: number;

  constructor(props){
    super(props);
    const appState = props[STORE_APP_STATE] as AppStateStore;
    this.state = {
      to: appState.toDate,
      from: appState.fromDate,
      options: selectOption,
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

  changeStep = (int) => {
    // console.log(int.value)
    this.setState({ changeOption: int })
  }

  render() {
    const { from, to, options, changeOption } = this.state;
    const modifiers = { start: from, end: to };
    const now = new Date();

    return (
      <header>
        <div className={styles.headerContent}>
          <Link to={'/'} className={styles.logo}>
            <LogoIcon />
          </Link>
          <div className={styles.menu}>
            {
              menu.map((item, index) => {
                return (
                  <Link to={item.link} key={index} className={styles.menuItem}> {item.name} </Link>
                )
              })
            }
          </div>
          <div className={styles.selctedContainer}>
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
      </header>
    );
  }
}

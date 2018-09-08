import * as React from 'react';
import { Link } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Select from 'react-select';
import * as styles from './header.scss';
import { LogoIcon } from 'app/icons';
import { menu } from 'app/constants';
import { options as selectOption, stepValueProps } from 'app/constants/stepValues';
import { format, parseDate, formatDate } from 'app/lib/date';
import { observer, inject } from 'mobx-react';
import { APP_STATE } from 'app/constants';
import { AppStateStore } from 'app/stores';
import { History } from 'history'
import * as cls from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router';

export interface HeaderProps {
  logsBadge?: string;
}

export interface HeaderState {
  from: Date;
  to: Date;
  options: stepValueProps[];
  changeOption: stepValueProps | null;
}

export type RoutedHeaderProps = HeaderProps & RouteComponentProps<HeaderProps>;

@inject(APP_STATE)
@observer
class HeaderComponent extends React.Component<RoutedHeaderProps, HeaderState> {

  to: DayPickerInput;
  timeout: number;

  constructor(props) {
    super(props);
    const { toDate, fromDate } = props[APP_STATE] as AppStateStore;
    this.state = {
      to: toDate,
      from: fromDate,
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
    const { match } = this.props;
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
            {menu.map((item, index) => {
              const linkClass = cls(styles.menuItem, { [styles.activeMenu]: match.path === item.link })
              return item.extenal
                ?
                <a href={item.link} key={index} className={linkClass} target="_blank">
                  {` ${item.name} `}
                </a>
                :
                <Link to={item.link} key={index} className={linkClass}>
                  {` ${item.name} `}
                </Link>
            })}
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

export const Header = withRouter<RoutedHeaderProps>(HeaderComponent);

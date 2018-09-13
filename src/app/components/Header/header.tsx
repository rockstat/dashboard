import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { LogoIcon } from 'app/icons';
import { menu } from 'app/constants';
import { APP_STATE } from 'app/constants';
import { AppStateStore } from 'app/stores';
import * as cls from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router';

import * as styles from './header.scss';

export interface HeaderProps {
  logsBadge?: string;
}

export interface HeaderState {
}

export type RoutedHeaderProps = HeaderProps & RouteComponentProps<HeaderProps>;

@inject(APP_STATE)
@observer
class HeaderComponent extends React.Component<RoutedHeaderProps, HeaderState> {

  render() {
    const { match, children } = this.props;

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
          {children}
        </div>
      </header>
    );
  }
}

export const Header = withRouter<RoutedHeaderProps>(HeaderComponent);

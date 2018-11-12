import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { UniversalLink } from '../link'
import { LogoIcon } from 'app/icons';
import { menuItems } from 'app/constants';
import { APP_STATE } from 'app/constants';
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
          <UniversalLink to={'/'} className={styles.logo}>
            <LogoIcon />
          </UniversalLink>
          <div className={styles.menu}>
            {menuItems.map((item, index) => {
              console.log(index);
              const linkClass = cls(
                styles.menuItem,
                { [styles.activeMenu]: match.path === item.link }
              );
              return <UniversalLink key={index} to={item.link} className={linkClass}>
                {item.name}
              </UniversalLink>
            })}
          </div>
          {children}
        </div>
      </header>
    );
  }
}

export const Header = withRouter<RoutedHeaderProps>(HeaderComponent);

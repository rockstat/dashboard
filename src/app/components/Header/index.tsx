import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './style.scss';

import { LogoIcon } from '../../icons';

import { menu } from '../../constants';

export interface HeaderProps {}

export interface HeaderState {}

export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header>
        <div className={styles.headerContent}>
          <Link to={'/'} className={styles.logo}>
            <LogoIcon />
          </Link>
          {/* <div className={styles.menu}>
            {
              menu.map((item, index) => {
                return (
                  <Link to={item.link} key={index} className={styles.menuItem}> { item.name } </Link>
                )
              })
            }
          </div> */}
          {/* <div className={styles.user}>test@test.com</div> */}
        </div>
      </header>
    );
  }
}

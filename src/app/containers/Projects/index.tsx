import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';

import { Project } from '../../components';
import { projects } from '../../constants';

interface ProjecstState {
  activeElement: number;
  hover: boolean;
}

export class Projects extends React.Component<{}, ProjecstState> {
  state = {
    activeElement: -1,
    hover: false
  }

  _hover = (number: number) => {
    this.setState({
      activeElement: number,
      hover: true
    })
  }

  _hoverOut = () => {
    this.setState({
      activeElement: -1,
      hover: false
    })
  }

  render() {
    return (
      <div className={cl(styles.projectsContainer, 'projects-container')}>
      {
        projects.map((item, index) => {
          return (
            <Project 
              {...item}
              {...this.state}
              key={index}
              number={index}
              hoverProject={(e) => this._hover(e)}
              hoverOutProject={() => this._hoverOut()}
            />
          )
        })
      }
      </div>
    )
  }
}

import * as React from 'react';
import * as styles from './style.scss';

import { Project } from '../../components';
import { projects } from '../../constants';

export class Projects extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.projectsContainer}>
      {
        projects.map((item, index) => {
          return (
            <Project {...item} key={index}/>
          )
        })
      }
      </div>
    )
  }
}

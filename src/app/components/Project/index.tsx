import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';

import { ProjectsInterface } from '../../constants';
import { SettingsIcon, RefreshIcon, PauseIcon } from 'app/icons';

interface ProjectProps extends ProjectsInterface {
  number: number;
  hoverProject: (e: number) => void;
  hoverOutProject: () => void;
  activeElement: number;
  hover: boolean;
}

export class Project extends React.Component<ProjectProps, {}> {
  render() {
    const { 
      name,
      date,
      cpu, 
      resp, 
      mem, 
      number, 
      hover, 
      activeElement,
      hoverProject,
      hoverOutProject
    } = this.props;

    return (
      <div 
        className={cl(styles.project, {[styles.active]: activeElement === number}, {[styles.hovered]: hover})}
        onMouseEnter={() => hoverProject(number)}
        onMouseLeave={() => hoverOutProject()}
      >
        <div className={styles.name}> { name } </div>
        <div className={styles.date}> { date } </div>

        <div className={styles.dataContainer}>
          <div className={styles.resp}>
            <div className={styles.lineContainer}>
              <div 
                className={styles.line} 
                style={{
                  transform: `translateX(${-(100 - resp)}%)`
                }} 
              />
            </div>
            <div className={styles.title}>resp</div>
          </div>
          <div className={styles.cpu}>
            <div className={styles.lineContainer}>
                <div 
                  className={styles.line} 
                  style={{
                    transform: `translateX(${-(100 - cpu)}%)`
                  }} 
                />
              </div>
            <div className={styles.title}>cpu</div>
          </div>
          <div className={styles.mem}>
              <div className={styles.lineContainer}>
                <div 
                  className={styles.line} 
                  style={{
                    transform: `translateX(${-(100 - mem)}%)`
                  }} 
                />
              </div>
            <div className={styles.title}>mesm</div>
          </div>
        </div>

        <div className={styles.eventContainer}>
          <div className={styles.settings}><SettingsIcon /></div>
          <div className={styles.refresh}><RefreshIcon /></div>
          <div className={styles.pause}><PauseIcon /></div>
        </div>
      </div>
    )
  }
}

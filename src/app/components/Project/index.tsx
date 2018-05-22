import * as React from 'react';
import * as styles from './style.scss';

import { ProjectsInterface } from '../../constants';

interface ProjectProps extends ProjectsInterface {}

export class Project extends React.Component<ProjectProps, {}> {
  render() {
    const { name, date, cpu, resp, mem } = this.props;

    return (
      <div className={styles.project}>
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
      </div>
    )
  }
}

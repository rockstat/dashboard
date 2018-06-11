import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { Link } from 'react-router-dom';

import { ProjectsInterface } from '../../constants';
import { SettingsIcon, RefreshIcon, PauseIcon } from 'app/icons';
import { LinkToIdeIcon } from 'app/icons/LinkToIdeIcon';

interface ProjectProps {
  // number: number;
  container: ProjectsInterface;
  // onClickSettings: (i: number, e: HTMLDivElement) => void;
}

export class Project extends React.Component<ProjectProps, {}> {
  projetContainer: HTMLDivElement;

  render() {
    const { container } = this.props;
    const { name, date, cpu, resp, mem } = container;
    const number = 1;
    const onClickSettings = (...args: any[]) => { };

    return (
      //
      // Тут бы конечно вообще в одну сущность слить, или враппер какой-нить чтобы дальше их перетаскивать можно было.
      //
      !this.props.container ? <div className={styles.addProject}>+</div> :
        <div
          className={cl(styles.project)}
          ref={(ref: HTMLDivElement) => this.projetContainer = ref}
        >
          <div className={styles.name}> {name} </div>
          <div className={styles.date}> {date} </div>

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
              <div className={styles.title}>
                <span>sla</span>
                <span>{' '}{resp} %</span>
              </div>
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
              <div className={styles.title}>
                <span>cpu</span>
                <span>{' '}{cpu} %</span>
              </div>
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
              <div className={styles.title}>
                <span>mem</span>
                <span>{' '}{mem} %</span>
              </div>
            </div>
          </div>

          <div className={styles.eventContainer}>
            <div className={styles.settings} onClick={(e) => onClickSettings(number, this.projetContainer)}><SettingsIcon /></div>
            <Link to={'/ide'} target={'__blank'} className={styles.linkTo}><LinkToIdeIcon /></Link>
          </div>
        </div>
    )
  }
}

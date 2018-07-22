import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { Link } from 'react-router-dom';

import { ProjectsInterface } from '../../constants';
import { SettingsIcon, RefreshIcon, PauseIcon } from 'app/icons';
import { LinkToIdeIcon } from 'app/icons/LinkToIdeIcon';
import { BandService, BandServicesMap } from 'app/types';

import { formatDistance, subSeconds, subMilliseconds } from 'date-fns'
import { AddProject } from 'app/components/Project/AddProject';


const DisplayUptime = ({ uptime }: { uptime: number }) => {
  const formatted = formatDistance(subMilliseconds(new Date(), uptime), new Date())
  return (
    <span>{formatted}</span>
  )
}

interface ProjectProps {
  // number: number;
  container: BandService;
  all?: BandServicesMap;
  // onClickSettings: (i: number, e: HTMLDivElement) => void;
}

export class Project extends React.Component<ProjectProps, {}> {
  projetContainer: HTMLDivElement;

  render() {
    const { container, all } = this.props;
    // const { name, date, cpu, resp, mem } = container;
    const number = 1;
    const onClickSettings = (...args: any[]) => { };

    return (
      //
      // Тут бы конечно вообще в одну сущность слить, или враппер какой-нить чтобы дальше их перетаскивать можно было.
      //
      !this.props.container ? <AddProject all={all} /> :
        <div
          className={cl(styles.project)}
          ref={(ref: HTMLDivElement) => this.projetContainer = ref}
        >
          <div className={styles.name}> {container.title} </div>
          <div className={styles.date}> <DisplayUptime uptime={container.uptime} /> </div>

          <div className={styles.dataContainer}>
            <div className={styles.resp}>
              <div className={styles.lineContainer}>
                <div
                  className={styles.line}
                  style={{
                    transform: `translateX(${-(100 - container.sla)}%)`
                  }}
                />
              </div>
              <div className={styles.title}>
                <span>SLA</span>
                <span>{' '}{container.sla} %</span>
              </div>
            </div>
            <div className={styles.cpu}>
              <div className={styles.lineContainer}>
                <div
                  className={styles.line}
                  style={{
                    transform: `translateX(${-(100 - container.cpu)}%)`
                  }}
                />
              </div>
              <div className={styles.title}>
                <span>CPU</span>
                <span>{' '}{container.cpu} %</span>
              </div>
            </div>
            <div className={styles.mem}>
              <div className={styles.lineContainer}>
                <div
                  className={styles.line}
                  style={{
                    transform: `translateX(${-(100 - container.mem)}%)`
                  }}
                />
              </div>
              <div className={styles.title}>
                <span>MEM</span>
                <span>{' '}{container.mem} %</span>
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

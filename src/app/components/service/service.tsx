import * as React from 'react';
import * as cl from 'classnames';
import { Link } from 'react-router-dom';
import { ProjectsInterface } from 'app/constants';
import { SettingsIcon, RefreshIcon, PauseIcon } from 'app/icons';
import { LinkToIdeIcon } from 'app/icons/LinkToIdeIcon';
import { BandService, BandServicesMap, BandImage } from 'app/types';
import { formatDistance, subSeconds, subMilliseconds } from 'date-fns'
import { AddProject } from './holder';
import { RemoveIcon } from 'app/icons/RemoveIcons';
import { validServicesChanges } from 'app/constants/validServicesChanges';

import * as styles from './style.scss';

const DisplayUptime = ({ uptime }: { uptime: number }) => {
  const formatted = formatDistance(subMilliseconds(new Date(), uptime), new Date())
  return (
    <span>{formatted}</span>
  )
}

interface ProjectProps {
  // number: number;
  container: BandService;
  all?: BandImage[];
  onRunClick: (image: BandImage, pos: string) => void;
  deleteService: (serviceName: string) => void;
  pos: string;
  serviceLoading: boolean;
  // onClickSettings: (i: number, e: HTMLDivElement) => void;
}

export class Project extends React.Component<ProjectProps, {}> {
  projetContainer: HTMLDivElement;

  render() {
    const { container, all, onRunClick, deleteService, pos, serviceLoading } = this.props;
    // const { name, date, cpu, resp, mem } = container;
    const number = 1;
    const onClickSettings = (...args: any[]) => { };

    return (
      //
      // Тут бы конечно вообще в одну сущность слить, или враппер какой-нить чтобы дальше их перетаскивать можно было.
      //
      !this.props.container ? <AddProject serviceLoading={serviceLoading} onRunClick={onRunClick} all={all} pos={pos}/> :
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
            {
              validServicesChanges.indexOf(container.name) > -1 &&
                <div className={styles.remove} onClick={deleteService.bind(this, container.name)}><RemoveIcon /></div>
            }
            <Link to={'/ide'} target={'__blank'} className={styles.linkTo}><LinkToIdeIcon /></Link>
          </div>
        </div>
    )
  }
}

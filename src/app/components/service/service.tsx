import * as React from 'react';
import * as cl from 'classnames';
import { Link } from 'react-router-dom';
import { ProjectsInterface } from 'app/constants';
import { SettingsIcon, RefreshIcon, PauseIcon, PlayIcon, RebuildIcon } from 'app/icons';
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

interface ServiceProps {
  // number: number;
  container: BandService;
  images?: BandImage[];
  addService: (image: BandImage, pos: string) => void;
  runOrRebuildService: (image: BandService, pos: string) => void;
  deleteService: (serviceName: string) => void;
  restartService: (serviceName: string) => void;
  stopService: (serviceName: string) => void;
  pos: string;
  onDragStart: (nameContainer: string) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (pos: string, e: React.DragEvent<HTMLElement>) => void;
  // onClickSettings: (i: number, e: HTMLDivElement) => void;
}

interface EventsIcons {
  restart?: JSX.Element;
  ['start/stop']?: JSX.Element;
  settings?: JSX.Element;
  remove?: JSX.Element;
  rebuilt?: JSX.Element;
}

export class Project extends React.Component<ServiceProps, {}> {
  projetContainer: HTMLDivElement;

  renderEvents = (Service: BandService) => {
    const { deleteService, restartService, stopService, runOrRebuildService, pos } = this.props;
    let events: EventsIcons = {
      restart: <div key={0} className={styles.refresh} onClick={restartService.bind(this, Service.name)}><RefreshIcon /></div>,
      ['start/stop']: Service.state === 'running' ?
        <div key={1} className={styles.pause} onClick={stopService.bind(this, Service.name)}><PauseIcon /></div> :
        <div key={1} className={styles.play} onClick={runOrRebuildService.bind(this, Service, pos)}><PlayIcon /></div>,
      settings: <div key={2} className={styles.settings}><SettingsIcon /></div>,
      remove: <div key={3} onClick={deleteService.bind(this, Service.name)} className={styles.remove}><RemoveIcon /></div>,
      rebuilt: <div key={4} className={styles.rebuild} onClick={runOrRebuildService.bind(this, Service, pos)}><RebuildIcon /></div>
    }
    let eventsVisibile: string[] = [];
    let result: JSX.Element[] = [];

    if (Service.meta.managed){
      eventsVisibile = [...eventsVisibile, 'restart'];
      if (!Service.meta.protected && Service.meta.persistent) {
        eventsVisibile = [...eventsVisibile, 'start/stop'];
      }
    }

    if (Service.meta.native) {
      eventsVisibile = [...eventsVisibile, 'settings'];
      if (!Service.meta.protected) {
        eventsVisibile = [...eventsVisibile, 'remove', 'rebuild'];
      }
    }

    eventsVisibile.map(item => {
      result = [...result, events[item]];
    });

      return result;
  }

  render() {
    const { container, images, pos, addService, onDragStart, onDragOver, onDrop } = this.props;
    // const { name, date, cpu, resp, mem } = container;
    const number = 1;
    const onClickSettings = (...args: any[]) => { };

    return (
      //
      // Тут бы конечно вообще в одну сущность слить, или враппер какой-нить чтобы дальше их перетаскивать можно было.
      //
      !this.props.container ?
        <AddProject
          onRunClick={addService}
          images={images}
          pos={pos}
          onDragOver={onDragOver}
          onDrop={onDrop.bind(this, pos)}
        /> :
        <div
          onDragStart={onDragStart.bind(this, container.name)}
          draggable
          className={cl(styles.project, {[styles.loading]: container.state !== 'running'})}
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
              <div className={styles.eventsContainerRules}>
                { this.renderEvents(container) }
              </div>
            <a href={`https://theia.stage.rstat.org/?open=${container.name}`} target={'__blank'} className={styles.linkTo}>
              <LinkToIdeIcon />
            </a>
          </div>
        </div>
    )
  }
}

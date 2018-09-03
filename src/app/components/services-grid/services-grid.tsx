import * as React from 'react';
import * as cl from 'classnames';
import { STORE_BAND } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { BandStore } from 'app/stores';
import { ShowIf } from 'app/components/show-if';
import { Project } from 'app/components';
import { BandServicesMap, BandImage, BandImagesList, BandService } from 'app/types';

import * as styles from './style.scss';

interface ServicesGridState {
  modalPosition: number;
}

export interface ServicesGridProps {
  // [STORE_BAND]: BandStore;
  onRestart: (name: string) => any;
  onStop: (name: string) => any;
  onDelete: (name: string) => any;
  onRun: (service: BandService, pos: string) => any;
  onAdd: (service: BandImage, pos: string) => any;
  services?: BandServicesMap
  images?: BandImagesList
}


const renderImages = (images, services) => {
  const imagesResult: BandImage[] = [];

  images.forEach(item => {
    let detectRunImage: boolean = true;
    services.forEach(service => {
      if (item.key === service.name) {
        detectRunImage = false;
        return;
      }
    })
    if (detectRunImage) {
      imagesResult.push(item);
    }
  })
  return imagesResult;
}

export class ServicesGrid extends React.Component<ServicesGridProps, ServicesGridState> {
  state = {
    modalPosition: 0
  }

  // _openSettings = (index: number, e: HTMLDivElement) => {
  //   this.setState({
  //     showAdd: true,
  //     modalPosition: e.offsetTop - 631
  //   })
  // }
  // _closeSetting = () => {
  //   this.setState({
  //     showAdd: false
  //   })
  // }

  render() {
    const { services, images } = this.props;
    const resultImages = renderImages(images, services)

    return (
      <ShowIf condition={services && images}>
        <div className={cl(styles.projectsContainer, 'projects-container')}>
          {Array.apply(0, Array(6)).map((_, row) => {
            return Array.apply(0, Array(6)).map((_, col) => {
              const pos = `${col}x${row}`;
              return (
                <Project
                  key={pos}
                  pos={pos}
                  container={services.get(pos)}
                  images={resultImages}
                  restartService={this.props.onRestart}
                  runOrRebuildService={this.props.onRun}
                  stopService={this.props.onStop}
                  addService={this.props.onAdd}
                  deleteService={this.props.onDelete}
                />
              )
            })
          })}
        </div>
      </ShowIf>
    )
  }
}

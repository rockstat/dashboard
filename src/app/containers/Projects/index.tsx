import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { STORE_BAND } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { BandStore } from 'app/stores';

import { Project } from '../../components';

import { RootProps } from 'app/containers/Root';
import { BandService } from 'app/types';

interface ProjecstState {
  modalPosition: number;
}

export interface ProjectsProps extends RootProps { 
  [STORE_BAND]?: BandStore;
 }


const ContainerGrid = (props: ProjectsProps) => {
  const { services, images, ...rest } = props;
  
  const creatService = async(service: BandService) => {
    const { band } = props;

    await band.addServices(service);
  }

  return (
    <div className={cl(styles.projectsContainer, 'projects-container')}>
      {Array.apply(0, Array(6)).map(function (_, row) {
        return Array.apply(0, Array(6)).map(function (_, col) {
          const pos = `${col}x${row}`;
          return (
            <Project
              container={services && services.get(pos)}
              all={images && images}
              key={pos}
              creat={creatService}
            // number={5}
            // onClickSettings={this._openSettings}
            />
          )
        })
      })}
    </div>
  )
}
  
@inject(STORE_BAND)
@observer
export class Projects extends React.Component<ProjectsProps, ProjecstState> {
  state = {
    modalPosition: 0
  }
  componentWillMount() {
    this.interval = setInterval(() => {
      this.props[STORE_BAND].loadServices();
    }, 3000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  interval: NodeJS.Timer | number;
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
    // let { showAdd, modalPosition, elements } = this.state;
    return <ContainerGrid {...this.props} />
  }
}

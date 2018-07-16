import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';

import { Project } from '../../components';

import { RootProps } from 'app/containers/Root';

interface ProjecstState {
  modalPosition: number;
}

export interface ProjectsProps extends RootProps { }


const ContainerGrid = (props: ProjectsProps) => {
  const { services, ...rest } = props;
  console.log(props)

  return (
    <div className={cl(styles.projectsContainer, 'projects-container')}>
      {Array.apply(0, Array(6)).map(function (_, row) {

        return Array.apply(0, Array(6)).map(function (_, col) {
          const pos = `${col}x${row}`;
          return (
            <Project
              container={services && services.get(pos)}
              key={pos}
            // number={5}
            // onClickSettings={this._openSettings}
            />
          )
        })
      })}
    </div>
  )
}


export class Projects extends React.Component<ProjectsProps, ProjecstState> {
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
    // let { showAdd, modalPosition, elements } = this.state;
    return <ContainerGrid {...this.props} />
  }
}

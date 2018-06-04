import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import * as Clone from 'clone';

import { Project, InformationContainer  } from '../../components';
import { projects, ProjectsInterface } from '../../constants';

interface ProjecstState {
  elements: Array<ProjectsInterface>;
  showAdd: boolean;
  modalPosition: number;
}

export class Projects extends React.Component<{}, ProjecstState> {
  state = {
    elements: Clone(projects),
    showAdd: false,
    modalPosition: 0 
  }

  _addItem = (index: number, e) => {
    this.setState({
      showAdd: true,
      modalPosition: e.target.offsetTop - 631
    })
  }

  _renderProjects = () => {
    let result: Array<string | JSX.Element> = [];
    let { elements } = this.state;

    for (let i=0; i < 36; i++) {
      let findPosition: boolean | number = false;

      elements.map((item, index) => {
         if (item.position === i) {
          findPosition = index;
         } 
      })

      result.push(
        findPosition === false ?
          <div key={i} className={styles.addProject}>+</div>
            :
          <Project 
            {...elements[findPosition]}
            {...this.state}
            key={i}
            number={i}
            onClickSettings={this._openSettings}
          />
      )
    }

    return result;
  }

  _openSettings = (index: number, e: HTMLDivElement) => {
    this.setState({
      showAdd: true,
      modalPosition: e.offsetTop - 631
    })
  }

  _closeSetting =() => {
    this.setState({
      showAdd: false
    })
  }

  render() {
    let { showAdd, modalPosition } = this.state;

    return (
      <div className={cl(styles.projectsContainer, 'projects-container')}>
        { this._renderProjects() }

        <InformationContainer
          title={'Title'}
          created={'10 sep 2018'}
          uptime={'34 days'}
          graphs={{
            sla: 23,
            cpu: 12,
            mem: 46
          }}
          description={'Geocoding service. Locate geo position with city accurancy using ip address. Update database on build'}
          container={'sxgeo (rst/collection-sxgeo)'}
          baseImage={'rst/band-py'}
          methods={[
            'enrich ( ip: string )'
          ]}
          show={showAdd}
          topPosition={modalPosition}
          closeSettings={this._closeSetting}
        />
      </div>
    )
  }
}

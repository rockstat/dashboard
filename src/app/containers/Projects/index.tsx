import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import * as Clone from 'clone';

import { Project, InformationContainer } from '../../components';
import { projects as ProjectsData, ProjectsInterface } from '../../constants';

import { RootProps } from 'app/containers/Root';

interface ProjecstState {
  elements: Array<ProjectsInterface>;
  showAdd: boolean;
  modalPosition: number;
}

const ContainerGrid = (props) => {
  const { available, elements, ...rest } = props;
  return (
    <div className={cl(styles.projectsContainer, 'projects-container')}>
      {Array.apply(0, Array(6)).map(function (x, i) {
        console.log(elements[1])
        return Array.apply(0, Array(6)).map(function (y, j) {
          console.log(`${i}-${j}`)
          return (
            <Project
              container={elements[1]}
              key={`${i}-${j}`}
            // number={5}
            // onClickSettings={this._openSettings}
            />
          )
        })
      })}
    </div>
  )
}


export interface ProjectsProps extends RootProps { }

export class Projects extends React.Component<ProjectsProps, ProjecstState> {
  state = {
    elements: Clone(ProjectsData),
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

    for (let i = 0; i < 36; i++) {
      let findPosition: boolean | number = false;

      elements.map((item, index) => {
        if (item.position === i) {
          findPosition = index;
        }
      })

      result.push(
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

  _closeSetting = () => {
    this.setState({
      showAdd: false
    })
  }

  render() {
    let { showAdd, modalPosition, elements } = this.state;
    return <ContainerGrid {...this.props} elements={elements} />
  }
}

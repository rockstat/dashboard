import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { BandServicesMap, BandService } from 'app/types';

export interface AddProjectProps {
  all?: BandServicesMap;
  creat: (service: BandService) => void;
}

interface AddProjectState {
  active: boolean;
}

export class AddProject extends React.Component<AddProjectProps, AddProjectState> {
  state = {
    active: false
  }

  changeAdd = () => {
    this.setState({
      active: true
    });
  }

  addContainer = async(service: BandService) => {
    this.setState({
      active: false
    });
    this.props.creat(service);
  }

  onFocusAddContainer = () => {
    this.setState({
      active: false
    });
  }

  render() {
    const { active } = this.state;
    const { all } = this.props;
    let allLIst = [];
    all && all.forEach(item => allLIst.push(item));

    return (
      <div className={cl(styles.addProject, {[styles.active]: active})}>
        <div 
          className={cl(styles.overlay, {[styles.active]: active})}
          onClick={this.onFocusAddContainer}
        />
        <div className={cl(styles.addProjectBtn, {[styles.active]: active})} onClick={this.changeAdd}>+</div>
        <div className={cl(styles.addProjectList, {[styles.active]: active})}>
          {
            allLIst && allLIst.map((item, index) => {
              return (
                <div key={index} onClick={this.addContainer.bind(this, item)} className={styles.itemListVariant}>
                  <div className={styles.title}>{ item.title }</div>
                  <div className={styles.add}>+</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

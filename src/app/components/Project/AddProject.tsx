import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { STORE_BAND } from 'app/constants';
import { BandServicesMap, BandService } from 'app/types';
import { observer, inject } from 'mobx-react';
import { BandStore } from 'app/stores';

export interface AddProjectProps {
  all?: BandServicesMap;
  [STORE_BAND]: BandStore;
}

interface AddProjectState {
  active: boolean;
}

@inject(STORE_BAND)
@observer
export class AddProject extends React.Component<AddProjectProps, AddProjectState> {
  state = {
    active: false
  }

  inputContainerIverlay: HTMLInputElement;

  changeAdd = () => {
    this.setState({
      active: true
    });
  }

  addContainer = async(service: BandService) => {
    const { band } = this.props;
    this.setState({
      active: false
    });

    await band.addServices(service);
    await band.loadServices();
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

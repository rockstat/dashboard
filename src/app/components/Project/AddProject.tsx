import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { BandServicesMap, BandService, BandImage } from 'app/types';
import { validServicesChanges } from 'app/constants/validServicesChanges';

export interface AddProjectProps {
  all?: BandImage[];
  creat: (service: BandService) => void;
  pos: string;
  serviceLoading: boolean;
}

interface AddProjectState {
  active: boolean;
  loadingService: string;
}

export class AddProject extends React.Component<AddProjectProps, AddProjectState> {
  state = {
    active: false,
    loadingService: ''
  }

  changeAdd = () => {
    this.setState({
      active: true
    });
  }

  addContainer = async(service: BandService, pos: string) => {
    this.setState({
      active: false,
      loadingService: pos
    });
    this.props.creat(service);
  }

  onFocusAddContainer = () => {
    this.setState({
      active: false
    });
  }

  render() {
    const { active, loadingService } = this.state;
    const { all, pos, serviceLoading } = this.props;
    let allLIst: BandImage[] = [];
    all && all.forEach(item => allLIst.push(item));

    return (
      <div className={cl(styles.addProject, {[styles.active]: active}, {[styles.loading]: loadingService === pos && serviceLoading})}>
        <div 
          className={cl(styles.overlay, {[styles.active]: active})}
          onClick={this.onFocusAddContainer}
        />
        <div className={cl(styles.addProjectBtn, {[styles.active]: active})} onClick={this.changeAdd}>+</div>
        <div className={cl(styles.addProjectList, {[styles.active]: active})}>
          {
            allLIst && allLIst.map((item, index) => {
              return (
                <div 
                  key={index}
                  onClick={this.addContainer.bind(this, item, pos)}
                  className={cl(styles.itemListVariant, {[styles.disabled]: validServicesChanges.indexOf(item.key) < 0})}>
                  <div className={styles.title}>{ item.meta.title }</div>
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

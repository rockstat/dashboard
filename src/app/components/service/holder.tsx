import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { BandServicesMap, BandImage } from 'app/types';
// import { validServicesChanges } from 'app/constants/validServicesChanges';

export interface RunServiceProps {
  all?: BandImage[];
  onRunClick: (service: BandImage, pos: string) => void;
  pos: string;
  serviceLoading: boolean;
}

interface RunServiceState {
  active: boolean;
  loadingService: string;
}

export class AddProject extends React.Component<RunServiceProps, RunServiceState> {
  state = {
    active: false,
    loadingService: ''
  }

  changeAdd = () => {
    this.setState({
      active: true
    });
  }

  runService = async(image: BandImage, pos: string) => {
    this.setState({
      active: false,
      loadingService: pos
    });
    this.props.onRunClick(image, pos);
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
                  onClick={this.runService.bind(this, item, pos)}
                  // , {[styles.disabled]: validServicesChanges.indexOf(item.key) < 0}
                  className={cl(styles.itemListVariant)}>
                  <div className={styles.title}>{ item.key }</div>
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

import * as React from 'react';
import * as styles from './style.scss';
import * as cl from 'classnames';
import { BandServicesMap, BandImage } from 'app/types';
// import { validServicesChanges } from 'app/constants/validServicesChanges';

export interface RunServiceProps {
  images?: BandImage[];
  onRunClick: (service: BandImage, pos: string) => void;
  pos: string;
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
    const { images, pos } = this.props;
    let allLIst: BandImage[] = [];
    images && images.forEach(item => allLIst.push(item));

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
                <div
                  key={index}
                  onClick={this.runService.bind(this, item, pos)}
                  className={cl(styles.itemListVariant
                  // {[styles.disabled]: this.validServicesChanges(item).changeDetect}
                )}>
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

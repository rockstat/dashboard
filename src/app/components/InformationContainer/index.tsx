import * as React from 'react';
import * as cl from 'classnames';
import * as style from './style.scss';

import { CircleComponentInfo } from '../index';

import { RefreshIcon } from '../../icons/RefreshIcon';

interface InformationContainerProps {
  title: string;
  created: string;
  graphs: {
    sla: number;
    cpu: number;
    mem: number;
  };
  description: string;
  container: string;
  baseImage: string;
  methods: Array<string>;
  uptime: string;
  show: boolean;
  topPosition: number;
  closeSettings: () => void
}

interface InformationContainerState {
  activeTabe: string;
};

export class InformationContainer extends React.Component<InformationContainerProps, InformationContainerState> {
  state = {
    activeTabe: 'console'
  }

  _changeTab = (type: string) => {
    this.setState({
      activeTabe: type
    })
  }

  render() {
    const {
      title,
      created,
      graphs,
      description,
      container,
      baseImage,
      methods,
      uptime,
      show,
      topPosition,
      closeSettings
     } = this.props;
     const { activeTabe } = this.state;

    return (
      [
        <div 
          className={cl(style.informationContainer, {[style.show]: show})}
          style={{
            top: `${topPosition}px`
          }}
          key={1}
        >
          <div className={style.left}>
            <div className={style.title}> { title } </div>
            <div className={style.created}> 
              <span>Created at:</span>
              <span>{ created }, </span>
              <span>uptime:</span>
              <span>{ uptime }</span>
            </div>
            <div className={style.graphs}>
              <div className={style.graphSla}>
                <CircleComponentInfo 
                    bottomText={'Sla'}
                    value={89}
                    colorValue={'#7f3cde'}
                    toFixed={0}
                  />
              </div>
              <div className={style.graphCpu}>
                <CircleComponentInfo 
                    bottomText={'Cpu'}
                    value={49}
                    colorValue={'#7cd7ac'}
                    toFixed={0}
                  />
              </div>
              <div className={style.graphMem}>
                <CircleComponentInfo 
                    bottomText={'Mem'}
                    value={59}
                    colorValue={'#6c86d9'}
                    toFixed={0}
                  />
              </div>
            </div>
            <div className={style.description}>
              <span>Description</span>
              <span> { description } </span>
            </div>
            <div className={style.container}> Container: { container } </div>
            <div className={style.baseIMage}> Base image: { baseImage }  </div>
            <div className={style.methods}>
              <div className={style.methodsTitle}>Methods</div>

              {
                methods.map((item, index) => {
                  return (
                    <div key={index} className={style.methodsName}> <span>></span> {item}</div>
                  )
                })
              }
            </div>
            <div className={style.btns}>
              <div className={style.rebuild}> 
                <span> <RefreshIcon /> </span>
                <span>Rebuild</span>
              </div>
              <div className={style.terminate}> 
                <span>X</span>
                <span>Terminate</span>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.btns}>
              <div 
                className={cl(style.console, {[style.active]: activeTabe === 'console'})}
                onClick={this._changeTab.bind(this, 'console')}
              >
                Console 
              </div>
              <div
                className={cl(style.config, {[style.active]: activeTabe === 'config'})}
                onClick={this._changeTab.bind(this, 'config')}
              > 
                  Config 
              </div>
            </div>
            <div className={style.infoCont}>
              <div className={cl(style.console, {[style.active]: activeTabe === 'console'})}></div>
              <div className={cl(style.config, {[style.active]: activeTabe === 'config'})}></div>
            </div>
          </div>
        </div>,
        <div 
          key={2} 
          className={cl(style.overlay, {[style.active]: show})} 
          onClick={() => closeSettings()}
        />
      ]
    );
  }
}

import * as React from 'react';

import * as style from './style.scss';

interface LabelsItemProps {
  items: Array<{
    title: string;
    subtitle: string;
    line?: string;
    center?: boolean;
  }>;
}

export class LabelsItme extends React.Component<LabelsItemProps, {}> {
  render() {
    const { items } = this.props;
    
    return (
      <div className={style.labelsItemsContainer}>
        {
          items.map((item, index) => {
            return (
              <div key={index} className={style.item}>
                {
                  item.line !== undefined &&
                    <div 
                      className={style.line} 
                      style={{
                        backgroundColor: item.line
                      }}
                    />
                }
                <div className={style.textContainer} style={{ 
                  textAlign: item.center ? 'center' : 'left'
                }}>
                  <div className={style.title} dangerouslySetInnerHTML={{__html: item.title}} />
                  <div className={style.subtitle}>{ item.subtitle }</div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

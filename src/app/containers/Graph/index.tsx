import * as React from 'react';

import * as style from './style.scss';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  DiscreteColorLegend,
  GradientDefs,
  Borders,
  Crosshair,
  LineMarkSeries,
  MarkSeries,
  RadialChart,
  Hint
} from 'react-vis';
import { StatStore } from 'app/stores';
import {
  STORE_STAT
} from 'app/constants';

import { LabelSub } from '../../components';

export interface TodoAppProps extends RouteComponentProps<any> {}

export interface TodoAppState {
  series: { [k: string]: any },
  titles: { [k: string]: string },
}


const timeOffset = 1514764800000;
const CHARTW = 1250;
const CHARTH = 500;


type SeriesPoints = Array<{ x: number, y: number }>;



// interface StatSeries {
//   data: SeriesPoints;
//   color: number | string | object;
//   key: number | string;
//   opacity: number;
// }

@inject(STORE_STAT)
@observer
export class GraphTest extends React.Component<TodoAppProps, TodoAppState> {
  componentWillMount() {
    this.checkLocationChange();

    const statStore = this.props[STORE_STAT] as StatStore;
    const { events, titles } = statStore;

    const colors = ['#D900FF', '#00F0FF', '#8C00FF', '#40FFC0', '#00F0FF'];

    const colorRanges = {
      typeA: ['#59E4EC', '#0D676C'],
      typeB: ['#EFC1E3', '#B52F93']
    };

    const useSeries = { 'session': true, 'pageview': true, 'field_blur': true };
    const series = [];
    let iter = 0;

    const seriesGroups = {

      pageview: { display: 1, color: '#00BEDE' },
      session: { display: 1, color: '#00E1FF' },

      form_submit: { display: 1, color: '#8C57B8' },
      field_blur: { display: 0, color: '#D900FF' },
      field_focus: { display: 0, color: '#D900FF' },
      field_change: { display: 1, color: '#D900FF' },
      field_invalid: { display: 0, color: 1 },

      link_click: { display: 0, color: '#00FFAB' },

      page_loaded: { display: 0, color: 3 },
      page_unload: { display: 0, color: 3 },
    }

    const ch = []
    for (const [k, data] of Object.entries(events)) {
      if (k in seriesGroups && seriesGroups[k].display === 1) {
        const i = iter++;
        series.push({
          fill: seriesGroups[k].color,
          key: i,
          data: data,
          opacity: 0.5,
          style: {
            stroke: '#000', 
            strokeWidth: '2px', 
            strokeOpacity: 0.2
          }
        })
      }
    }

    this.setState({
      series: series,
      titles: titles
    })
  }

  componentWillReceiveProps(nextProps: TodoAppProps, nextContext: any) {
    this.checkLocationChange();
  }

  checkLocationChange() {
    // const router = this.props[STORE_ROUTER] as RouterStore;
    // const filter = Object.keys(TODO_FILTER_LOCATION_HASH)
    //   .map((key) => Number(key) as TodoFilter)
    //   .find(
    //     (filter) => TODO_FILTER_LOCATION_HASH[filter] === router.location.hash
    //   );
    // this.setState({ filter });
  }

  render() {
    const { series, titles } = this.state;
    const radialColors = ['#D900FF', '#00F0FF', '#8C57B8', '#80FF80', '#40FFC0'];
    const newUsersColors = ['#8C57B8', '#D900FF'];

    return (
      <div className={style.graphContainer}>
        <XYPlot
          width={CHARTW}
          height={CHARTH}
        >
          {series.map(props => <AreaSeries {...props} />)}

          <Borders style={{
            bottom: { fill: '#131313', },
            left: { fill: '#131313' },
            right: { fill: '#131313' },
            top: { fill: '#131313' }
          }} />
          <XAxis
            tickTotal={Math.round(CHARTW/25/2)}
            tickFormat={function(d) {
              const nd = new Date(d + timeOffset);
              return nd.toLocaleDateString().substr(0, 5).replace('/', '.') + ' ' + nd.toLocaleTimeString().substr(0, 5)
            }}
          />
          <YAxis
            tickTotal={Math.round(CHARTH/25/2)}
          />
          <VerticalGridLines style={{ stroke: '#000', strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTW/25)}  />
          <HorizontalGridLines style={{ stroke: '#000',strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTH/25)} />

        </XYPlot>


        <div className={style.infoContainer}>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={130}
              radius={150}
              colorRange={radialColors}
              style={{stroke: '#000', strokeWidth: '2px', strokeOpacity: 0.5}}
              data={[
                { angle: 3, name: 'Desktop' },
                { angle: 6, name: 'Mobile' }
              ]}
              width={300}
              height={300}>
            </RadialChart>

          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={130}
              radius={150}
              labelsRadiusMultiplier={1}
              colorRange={newUsersColors}
              labelsStyle={{ fontSize: 15, fontWeight: 'bold', fill: '#FFF' }}
              style={{stroke: '#000', strokeWidth: '2px', strokeOpacity: 0.5}}
              data={[
                { angle: 6, label: '60.0%' },
                { angle: 3, label: '30.%' },
              ]}
              width={300}
              height={300}>
            </RadialChart>
          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={130}
              radius={150}
              colorType='literal'
              labelsStyle={{ fontSize: 15, fontWeight: 'bold', fill: '#FFF' }}
              labelsRadiusMultiplier={1}
              style={{stroke: '#000', strokeWidth: '2px', strokeOpacity: 0.5}}
              data={[ //, , , , 
                { angle: 7, label: '35.0%', color: '#D900FF' },
                { angle: 6, label: '30.0%', color: '#00F0FF' },
                { angle: 3, label: '15.0%', color: '#8C57B8' },
                { angle: 2, label: '10.0%', color: '#80FF80' },
                { angle: 2, label: '10.0%', color: '#40FFC0' },
              ]}
              width={300}
              height={300}>
            </RadialChart>
          </div>
        </div>
        <div className={style.infoContainer}>
          <DiscreteColorLegend
            orientation='vertical'
            items={[
              { title: <LabelSub title='Desktop' subtitle='66.0%'/>, color: radialColors[0] },
              { title: <LabelSub title='Mobile' subtitle='33.0%'/>, color: radialColors[1] }
            ]}
          />
          <DiscreteColorLegend
            orientation='vertical'
            items={[
              { title: <LabelSub title='New users' subtitle='60.0%'/>, color: radialColors[0] },
            ]}
          />
          <DiscreteColorLegend
            orientation='vertical'
            items={[
              { title: <LabelSub title='Direct' subtitle='35.0%'/>, color: radialColors[0] },
              { title: <LabelSub title='Campaign' subtitle='30.0%'/>, color: radialColors[1] },
              { title: <LabelSub title='Social' subtitle='15.0%'/>, color: radialColors[2] },
              { title: <LabelSub title='Organic' subtitle='10.0%'/>, color: radialColors[3] },
              { title: <LabelSub title='Referral' subtitle='10.0%'/>, color: radialColors[4] },
            ]}
          />
        </div>
        <div className={style.legend}>
          <DiscreteColorLegend
            orientation='vertical'
            items={Object.values(titles)}
          />
        </div>
      </div>
    );
  }
}

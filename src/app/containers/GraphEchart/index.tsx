import * as React from 'react';
import * as style from './style.css';

// import './style.css';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';



import { StatStore } from 'app/stores';
import {
  STORE_STAT
} from 'app/constants';

import ReactEcharts from 'echarts-for-react';



export interface TodoAppProps extends RouteComponentProps<any> {
}

export interface TodoAppState {
  series: { [k: string]: any },
  titles: { [k: string]: string },
}

const timeOffset = 1514764800000;

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
  constructor(props: TodoAppProps, context: any) {
    super(props, context);
    // this.state = {  };
  }

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
            strokeWidth: '1px',
            fill: '#444'
          }
        })
      }
    }

    // this.series = series;

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
  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  // _onNearestX(value, { index }) {
  //   this.setState({ crosshairValues: DATA.map(d => d[index]) });
  // }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  // _onMouseLeave() {
  //   this.setState({ crosshairValues: [] });
  // }

  // getOption(){
  //   return {};
  // }

  render() {
    // const todoStore = this.props[STORE_TODO] as TodoStore;
    // const { } = this.props;
    const { series, titles } = this.state;


    // const filteredTodos = this.getFilteredTodo(filter);
    // https://github.com/uber/react-vis/blob/master/docs/area-series.md
    // http://uber.github.io/react-vis/documentation/series-reference/area-series
    // https://github.com/d3/d3-shape#curves
    // https://github.com/uber/react-vis/blob/master/docs/style.md
    return (
      <div className={style.graphContainer}>

        {/* <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          // onChartReady={this.onChartReadyCallback}
          // onEvents={EventsDict}
          opts={{}} /> */}


        <div className={style.informationContainer}>
          <div className={style.informationDevices}></div>
          <div className={style.newUsers}></div>
          <div className={style.informationDevicesTwo}></div>
        </div>
        <div className={style.legend}>

        </div>

      </div>
    );
    // return (
    //   <div className={style.normal}>

    //   </div>
    // );
  }
}

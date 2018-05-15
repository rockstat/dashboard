import * as React from 'react';
// import * as style from './style.css';
import './style.css';
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
  GradientDefs
} from 'react-vis';
import { StatStore } from 'app/stores';
import {
  STORE_STAT
} from 'app/constants';
export interface TodoAppProps extends RouteComponentProps<any> {
}

export interface TodoAppState {
}

type SeriesPoints = Array<{ x: number, y: number }>;

interface StatSeries {
  data: SeriesPoints;
  color: number | string | object;
  key: number | string;
  opacity: number;
}

@inject(STORE_STAT)
@observer
export class GraphTest extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps, context: any) {
    super(props, context);
    // this.state = {  };
  }

  componentWillMount() {
    this.checkLocationChange();
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
    // const todoStore = this.props[STORE_TODO] as TodoStore;
    // const { } = this.props;
    // const { } = this.state;
    const statStore = this.props[STORE_STAT] as StatStore;
    const { events, titles } = statStore;

    const colors = ['#D900FF', '#00F0FF', '#8C00FF', '#40FFC0', '#00F0FF'];

    const colorRanges = {
      typeA: ['#59E4EC', '#0D676C'],
      typeB: ['#EFC1E3', '#B52F93']
    };

    const useSeries = { 'session': true, 'pageview': true, 'field_blur': true };
    const series: Array<StatSeries> = [];

    let iter = 0;
    for (const [k, data] of Object.entries(events)) {
      // if (k in useSeries) {
      const i = iter++;
      series.push({ color: 'url(#CoolGradient)', key: i, data: data, opacity: 0.4 }) //i //''
      // }

    }


    console.log(series);

    // const filteredTodos = this.getFilteredTodo(filter);
    // https://github.com/uber/react-vis/blob/master/docs/area-series.md
    // http://uber.github.io/react-vis/documentation/series-reference/area-series
    // https://github.com/d3/d3-shape#curves
    // https://github.com/uber/react-vis/blob/master/docs/style.md
    return (
      <div>
        <XYPlot
          width={1300}
          height={400}
          colorType="linear"
          // colorDomain={[0, 12]}
          // colorRange={colors}
          stroke="#8C57B8"
        >
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D900FF" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity={0.3} />
            </linearGradient>
          </GradientDefs>
          <VerticalGridLines style={{ stroke: '#111111' }} />
          <HorizontalGridLines style={{ stroke: '#111111' }} />
          <XAxis hideTicks />
          <YAxis />
          {series.map(props => <AreaSeries {...props} />)}
        </XYPlot>
        <DiscreteColorLegend
          width={800}
          orientation="horizontal"
          items={Object.values(titles)}
        />
      </div>
    );
    // return (
    //   <div className={style.normal}>

    //   </div>
    // );
  }
}

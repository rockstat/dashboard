import * as React from 'react';
import * as style from './style.css';

// import './style.css';

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
import LegendItem from 'app/components/LegendItem'
export interface TodoAppProps extends RouteComponentProps<any> {

}

export interface TodoAppState {
  series: { [k: string]: any },
  titles: { [k: string]: string },
}


class LabelSub extends React.Component<{ title: string, subtitle: string }> {
  render() {
    const { title, subtitle } = this.props;
    return (
      <span className={style.infoContainerLabel}>
        <span className={style.infoContainerLabelTitle}>{title}</span>
        <span className={style.infoContainerLabelValue}>
          {subtitle}
        </span>
      </span>
    );
  }
}



const timeOffset = 1514764800000;
const CHARTW = 1250;
const CHARTH = 400;


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
            stroke: '#000', 
            strokeWidth: '2px', 
            strokeOpacity: 0.2
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



  render() {
    // const todoStore = this.props[STORE_TODO] as TodoStore;
    // const { } = this.props;
    const { series, titles } = this.state;

    const radialColors = ['#D900FF', '#00F0FF', '#8C57B8', '#80FF80', '#40FFC0'];
    const newUsersColors = ['#8C57B8', '#D900FF'];
    // const filteredTodos = this.getFilteredTodo(filter);
    // https://github.com/uber/react-vis/blob/master/docs/area-series.md
    // http://uber.github.io/react-vis/documentation/series-reference/area-series
    // https://github.com/d3/d3-shape#curves
    // https://github.com/uber/react-vis/blob/master/docs/style.md
    return (
      <div className={style.graphContainer}>
        <XYPlot
          width={CHARTW}
          height={CHARTH}
          //  style={{
          //     text: { stroke: 'none', fill: '#828282', fontWeight: 800 },
          //     line: { fill: '444' },
          //     ticks: { stroke: '#4F4F4F' },
          //   }}
        >
          {/* <GradientDefs>
            <linearGradient id="CoolGradientSession" x1="0" x2="0" y1="0" y2="1">
              <stop offset="50%" stopColor="#003B3F" stopOpacity={1} />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="CoolGradientPageview" x1="0" x2="0" y1="0" y2="1">
              <stop offset="50%" stopColor="#013F52" stopOpacity={1} />
              <stop offset="100%" stopColor="#00C2FF" stopOpacity={1} />
            </linearGradient>
          </GradientDefs> */}
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
            // style={{
              // text: { stroke: 'none', fill: '#828282', fontWeight: 400 },
              // line: { fill: '444' },
              // ticks: { stroke: '#4F4F4F' },
            // }}
          />
          <YAxis
            tickTotal={Math.round(CHARTH/25/2)}
            // style={{
              // text: { stroke: 'none', fill: '#828282', fontWeight: 400 },
              // line: { fill: 'red' },
              // ticks: { stroke: '#4F4F4F' },
            // }}
          />
          <VerticalGridLines style={{ stroke: '#000', strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTW/25)}  />
          <HorizontalGridLines style={{ stroke: '#000',strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTH/25)} />

        </XYPlot>


        <div className={style.infoContainer}>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={80}
              radius={100}
              colorRange={radialColors}
              style={{stroke: '#000', strokeWidth: '2px', strokeOpacity: 0.5}}
              data={[
                { angle: 3, name: 'Desktop' },
                { angle: 6, name: 'Mobile' }
              ]}
              // onValueMouseOver={v => this.setState({ value: v })}
              // onSeriesMouseOut={v => this.setState({ value: false })}
              width={200}
              height={200}>
              {/* {value && <Hint value={value} />} */}
            </RadialChart>

          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={80}
              radius={100}
              labelsRadiusMultiplier={1}
              colorRange={newUsersColors}
              labelsStyle={{ fontSize: 15, fontWeight: 'bold', fill: '#FFF' }}
              style={{stroke: '#000', strokeWidth: '2px', strokeOpacity: 0.5}}
              data={[
                { angle: 6, label: '60.0%' },
                { angle: 3, label: '30.%' },
              ]}
              // onValueMouseOver={v => this.setState({ value: v })}
              // onSeriesMouseOut={v => this.setState({ value: false })}
              width={200}
              height={200}>
              {/* {value && <Hint value={value} />} */}
            </RadialChart>
          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              className={'donut-chart-example'}
              innerRadius={80}
              radius={100}
              colorType="literal"
              // colorRange={radialColors}
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
              // onValueMouseOver={v => this.setState({ value: v })}
              // onSeriesMouseOut={v => this.setState({ value: false })}
              width={200}
              // angle={190}
              height={200}>
              {/* {value && <Hint value={value} />} */}
            </RadialChart>
          </div>
        </div>
        <div className={style.infoContainer}>
          <DiscreteColorLegend
            orientation="vertical"
            items={[
              { title: <LabelSub title='Desktop' subtitle='66.0%'/>, color: radialColors[0] },
              { title: <LabelSub title='Mobile' subtitle='33.0%'/>, color: radialColors[1] }
            ]}
          />
          <DiscreteColorLegend
            orientation="vertical"
            items={[
              { title: <LabelSub title='New users' subtitle='60.0%'/>, color: radialColors[0] },
            ]}
          />
          <DiscreteColorLegend
            orientation="vertical"
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
            // width={200}
            orientation="vertical"
            items={Object.values(titles)}
          />
        </div>

      </div>

    );
    // return (
    //   <div className={style.normal}>

    //   </div>
    // );
  }
}

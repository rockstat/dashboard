import * as React from 'react';
import * as style from './dash-chart.scss';
import { subDays, format as formatDate } from 'date-fns';
import d3 from 'app/lib/d3';
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
  Borders,
  Crosshair,
  MarkSeries,
} from 'react-vis';
import { StatStore } from 'app/stores';
import {
  STAT_STORE
} from 'app/constants';

import { LabelSub, LabelsItme, ShowIf } from 'app/components';
import { GroupsSeries, EventByTime } from 'app/types';

export interface DashChartProps extends RouteComponentProps<any> { }

export interface DashChartState {
  eventsByGroups: GroupsSeries;
  eventsTitles: Array<string>;
  eventsByTime: EventByTime;
  timeTicks: Array<{ x: string, y: number }>
  crosshairValues: Array<any>;
}

const CHARTW = 1250;
const CHARTH = 350;

const DONUT_RADIUS = 95;
const DONUT_WIDTH = 15;
const DONUT_STYLE = {
  // className: 'donut-chart-example',
  innerRadius: DONUT_RADIUS - DONUT_WIDTH,
  radius: DONUT_RADIUS,
  labelsRadiusMultiplier: 1,
  colorType: 'literal',
  style: { stroke: '#000', strokeWidth: '0', strokeOpacity: 0.5 },
  labelsStyle: { fontSize: 15, fontWeight: 'bold', fill: '#FFF' },
  width: 200,
  height: 200,
}


const seriesGroups = {
  page: { display: 1, color: '#00BEDE' },
  session: { display: 1, color: '#00E1FF' },
  form_submit: { display: 1, color: '#8C57B8' },
  field_blur: { display: 0, color: '#D900FF' },
  field_focus: { display: 0, color: '#D900FF' },
  field_change: { display: 1, color: '#D900FF' },
  field_invalid: { display: 0, color: '#EB3785' },
  link_click: { display: 0, color: '#00FFAB' },
  page_loaded: { display: 0, color: 3 },
  page_unload: { display: 0, color: 3 },
}

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};
const colors = ['#D900FF', '#00F0FF', '#8C00FF', '#40FFC0', '#00F0FF'];
const useSeries = { 'session': true, 'pageview': true, 'field_blur': true };
const radialColors = ['#D900FF', '#00F0FF', '#8C57B8', '#80FF80', '#40FFC0'];

@inject(STAT_STORE)
@observer
export class DashChart extends React.Component<DashChartProps, DashChartState> {
  state = {
    eventsTitles: [],
    eventsByGroups: {},
    timeTicks: [],
    eventsByTime: {},
    crosshairValues: [],
  };

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    const step = 900;
    const dtTill = new Date()
    const dtFrom = subDays(dtTill, 1);

    const statStore = this.props[STAT_STORE] as StatStore;

    statStore.loadSeries().then(() => {
      const { eventsByTime, eventsByGroups } = statStore;
      const eventsTitles = Object.keys(eventsByGroups).map(e => e.replace('_', ' '));
      const timeTicks = Object.keys(eventsByTime).map(t => ({ x: t, y: 0 }))
      this.setState({ eventsByGroups, eventsByTime, timeTicks, eventsTitles });
    })

    // statStore.loadCommon()
  }

  handleMouseOver(name, dp) {
    this.setState(({ eventsByTime }) => {
      const values = Object.entries(eventsByTime[dp.x]).map(([name, y]) => ({ x: dp.x, y, name: name }))
      return { crosshairValues: Object.values(values) }
    });
  }

  render() {
    const { eventsByGroups, timeTicks, eventsTitles } = this.state;
    return (
      <div className={style.graphContainer}>
        <XYPlot
          width={CHARTW}
          height={CHARTH}
          onMouseLeave={() => this.setState({ crosshairValues: [] })}
        >
          <VerticalGridLines style={{ stroke: '#fff', strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTW / 25 / 2)} />
          <HorizontalGridLines style={{ stroke: '#fff', strokeOpacity: 0.1 }} tickTotal={Math.round(CHARTH / 25 / 2)} />
          <MarkSeries data={timeTicks} onNearestX={(dp) => this.handleMouseOver(name, dp)} size={0} />
          {Object.entries(eventsByGroups)
            .filter(([name, data]) =>
              seriesGroups[name] && seriesGroups[name].display == 1)
            .map(([name, data]) =>
              <AreaSeries
                data={data}
                fill={seriesGroups[name].color}
                key={name}
                opacity={0.5}
                style={{ stroke: d3.color(seriesGroups[name].color).darker().hex(), strokeWidth: '1px', strokeOpacity: 1 }}
              />)}

          <Borders style={{
            bottom: { fill: '#131313', },
            left: { fill: '#131313' },
            right: { fill: '#131313' },
            top: { fill: '#131313' }
          }} />
          <XAxis
            tickTotal={4}
            tickFormat={function (d) {
              const nd = new Date(d * 1000);
              return nd.toLocaleDateString().substr(0, 5).replace('/', '.') + ' ' + nd.toLocaleTimeString().substr(0, 5)
            }}
          />
          <YAxis tickTotal={Math.round(CHARTH / 25 / 2)} />
          <Crosshair
            className={style.crosshairExtra}
            values={this.state.crosshairValues}
            titleFormat={(values) => ({ title: ':', value: formatDate(values[0].x * 1000, 'dd.MM.YY kk:mm') })}
            itemsFormat={(values) => values.map(v => ({ title: v.name, value: v.y }))}
          />
        </XYPlot>

        {/* <div className={style.infoContainer}>
          <div className={style.infoContainerChart}>
            <RadialChart
              // colorRange={radialColors}
              data={[
                { angle: 38.8, name: 'Desktop', color: '#D900FF' }, // '#8C57B8', '#80FF80', '#40FFC0' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 60, name: 'Mobile', color: '#00F0FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' }
              ]}
              {...DONUT_STYLE}>
            </RadialChart>

          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              data={[
                { angle: 65, label: '60.0%', color: '#8C57B8' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 35.8, label: '30.%', color: '#D900FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
              ]}
              {...DONUT_STYLE}>
            </RadialChart>
          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              data={[ //, , , ,
                { angle: 19.4, label: '35.0%', color: '#D900FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 39.4, label: '30.0%', color: '#00F0FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 19.4, label: '15.0%', color: '#8C57B8' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 9.4, label: '10.0%', color: '#80FF80' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 9.4, label: '10.0%', color: '#40FFC0' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
              ]}
              {...DONUT_STYLE}>
            </RadialChart>
          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              data={[ //, , , ,
                { angle: 40, label: '35.0%', color: '#00f0ff' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 10, label: '30.0%', color: '#033134' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 27.6, label: '15.0%', color: '#240223' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 20, label: '10.0%', color: '#fd2bf5' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
              ]}
              {...DONUT_STYLE}>
            </RadialChart>
          </div>
          <div className={style.infoContainerChart}>
            <RadialChart
              data={[ //, , , ,
                { angle: 25, label: '35.0%', color: '#D900FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 20, label: '30.0%', color: '#00F0FF' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 17, label: '15.0%', color: '#8C57B8' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 25, label: '10.0%', color: '#80FF80' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
                { angle: 10, label: '10.0%', color: '#40FFC0' },
                { angle: 0.6, name: 'Desktop', color: 'transparent' },
              ]}
              {...DONUT_STYLE}>
            </RadialChart>
          </div>
        </div> */}
        {/* <div className={style.infoContainerDis}>
          <div className={style.infoContainerDiscrete}>
            <DiscreteColorLegend
              orientation='vertical'
              items={[
                { title: <LabelSub title='Desktop' subtitle='66.0%' />, color: radialColors[0] },
                { title: <LabelSub title='Mobile' subtitle='33.0%' />, color: radialColors[1] }
              ]}
            />
          </div>

          <div className={style.infoContainerDiscrete}>
            <DiscreteColorLegend
              orientation='vertical'
              items={[
                { title: <LabelSub title='New users' subtitle='60.0%' />, color: radialColors[0] },
                { title: <LabelSub title='Returning' subtitle='40.0%' />, color: radialColors[0] },
              ]}
            />
          </div>=
          <div className={style.infoContainerDiscrete}>
            <DiscreteColorLegend
              orientation='vertical'
              items={[
                { title: <LabelSub title='Direct' subtitle='35.0%' />, color: radialColors[0] },
                { title: <LabelSub title='Campaign' subtitle='30.0%' />, color: radialColors[1] },
                { title: <LabelSub title='Social' subtitle='15.0%' />, color: radialColors[2] },
                { title: <LabelSub title='Organic' subtitle='10.0%' />, color: radialColors[3] },
                { title: <LabelSub title='Referral' subtitle='10.0%' />, color: radialColors[4] },
              ]}
            />
          </div>
          <div className={style.infoContainerDiscrete}>
            <DiscreteColorLegend
              orientation='vertical'
              items={[
                { title: <LabelSub title='CPU utilize' subtitle='35.0%' />, color: '#40ffc0' },
                { title: <LabelSub title='Memory' subtitle='30.0%' />, color: '#fd2bf5' },
              ]}
            />
          </div>
          <div className={style.infoContainerDiscrete}>
            <LabelsItme
              items={[
                { title: 'Disk <span style="color:#40ffc0">write</span>', subtitle: '0.3 Mb/s', center: true },
                { title: 'Disk <span style="color:#80ff80">read</span>', subtitle: '0.1 Mb/s', center: true },
                { title: 'Network <span style="color:#fd2bf5">In</span>', subtitle: '0.3 mbps', center: true },
                { title: 'Network <span style="color:#931fff">out</span>', subtitle: '0.8 mbps', center: true }
              ]}
            />
          </div>
        </div> */}
        <div className={style.legend}>
          <ShowIf condition={eventsTitles.length}>
            <DiscreteColorLegend
              orientation='vertical'
              items={eventsTitles}
            />
          </ShowIf>
        </div>
      </div>
    );
  }
}

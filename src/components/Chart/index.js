import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryTheme,
} from 'victory';

const Chart = ({data}) => (
  <div>
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          text="hi"
          labels={d =>
            `${d.fromAddress || 'Jobcoin API'} paid ${d.toAddress} $${d.amount}`
          }
          labelComponent={
            <VictoryTooltip
              data={data}
              cornerRadius={3}
              flyoutStyle={{
                fill: 'white',
                strokeWidth: 1,
              }}
            />
          }
        />
      }>
      <VictoryLine
        data={data}
        style={{
          data: {
            stroke: 'teal',
            strokeWidth: 2,
          },
        }}
      />

      <VictoryAxis
        dependentAxis
        label="Balance"
        style={{
          axis: {
            stroke: '#ddd',
          },
          grid: {
            stroke: 'rgba(0, 0, 0, 0.05)',
          },
          tickLabels: {
            fontSize: 11,
            fill: '#919497',
          },
        }}
      />
      <VictoryAxis
        label="Date of Transaction"
        theme={VictoryTheme.material}
        tickFormat={t => {
          let d = new Date(t);
          return d.getMonth() + '/' + d.getDate();
        }}
        style={{
          axis: {
            stroke: '#ddd',
          },
          grid: {
            stroke: 'rgba(0, 0, 0, 0.05)',
          },
          tickLabels: {
            fontSize: 11,
            fill: '#919497',
          },
        }}
      />
    </VictoryChart>
  </div>
);

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;

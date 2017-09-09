import * as React from 'react';
import smoothie from 'smoothie';

import './early-warning-system.css';

class EarlyWarningSystem extends React.Component {
  constructor(props) {
    super(props);
    this.chart = new smoothie.SmoothieChart({
      grid: {
        millisPerLine: 10000,
        verticalSections: 0
      },
      horizontalLines: [
        {color:'#ffffff',lineWidth:1,value:0},
        {color:'#880000',lineWidth:2,value:100},
        {color:'#008800',lineWidth:2,value:-100}
      ],
      millisPerPixel: 50,
      maxValue: 150,
      minValue: -180,
      timestampFormatter: smoothie.SmoothieChart.timeFormatter,
      labels: {disabled: true}
    });
    this.timeSeries = new smoothie.TimeSeries();
    this.chart.addTimeSeries(this.timeSeries, {lineWidth: 2, strokeStyle: '#ffff00'});
    this.canvasElement = null;
  }
  render() {
    return <canvas ref={(element) => { this.canvasElement = element }} className="ews-canvas" width="500" height="200" />
  }

  componentDidMount() {
    this.chart.streamTo(this.canvasElement, 1000/*delay*/);
  }
  componentWillUnmount() {
    this.chart.stop();
  }

  addReading(timeAgo, reading) {
    var t = new Date()
    t.setSeconds(t.getSeconds() - timeAgo);
    this.timeSeries.append(t, 100 * ((reading ? 1 : -1) + EarlyWarningSystem.normalvariate()/10));
  }

  // Standard Normal variate using Box-Muller transform.
  // Stolen from https://stackoverflow.com/a/36481059
  static normalvariate() {
      var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
      var v = 1 - Math.random();
      return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  }

}

export default EarlyWarningSystem;
